const missingMessage = (paramName) => `${paramName} is required`;
const invalidMessage = (paramName) => `${paramName} is invalid value`;
/**
 * 
 * @param {String} paramName 
 * @param {Array [String|Object]} listRuleOptions 
 */
export const normalValidate = (paramName, listRuleOptions) => {
  const basicRules = {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: missingMessage(paramName)
    },
  }
  let finalRules = { ...basicRules };
  if (listRuleOptions)
    listRuleOptions.forEach(elementRule => {
      if (typeof elementRule == 'string') {
        finalRules = {
          ...finalRules,
          [elementRule]: {
            errorMessage: invalidMessage(paramName),
          },
        }
      }
      else if (typeof elementRule == 'object') {
        const key = Object.keys(elementRule)[0];
        const rule = elementRule[key];
        finalRules = {
          ...finalRules,
          [key]: rule,
        }
      }
    });

  return finalRules;
}
/**
 * 
 * @param {string} name 
 * @param {string} rules 
 */
const buildSchema = (name, listRules) => {
  let schema = {};
  if (typeof listRules != 'string') return schema;
  const rules = schema.split('|');
  rules.forEach((rule) => {
    let config = configRule(name, rule);
    if (config)
      schema = { ...schema, ...config }
  })
  return schema;
}
function configRule(name, rule) {
  switch (rule) {
    case 'inAll': return { in: ['params', 'query', 'body'] }
    case 'inBody': return { in: ['body'] }
    case 'inURL': return { in: ['params', 'query'] }
    case 'required': return {
      isEmpty: {
        negated: true,
        errorMessage: missingMessage(name)
      }
    }
    case 'integer': return { isInt: true, toInt: true }
    case 'string': return {}
  }
}
export function isAValidId(id){
  return !!id.match(/^[0-9a-fA-F]{24}$/)
}

const rules = {
  build: (name, listRules) => buildSchema(name, listRules),
  required: (name) => normalValidate(name),
  email: normalValidate('Email', ['isEmail']),
  cellphone: normalValidate('Phone number', ['isMobilePhone']),
  country_code: normalValidate('Country code'),
}
export default rules;
