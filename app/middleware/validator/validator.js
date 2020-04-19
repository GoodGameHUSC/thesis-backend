import responseCode from '../../config/responseCode';
import { checkSchema, validationResult } from 'express-validator/check';

const ruleToValidate = (schema) => {
  return checkSchema(schema)
}
const processValidate = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.errors(error.array()[0].msg, 400, responseCode.params.invalid)
  }
  next();
}
const validateMiddleWare = (schema) =>
  [
    ruleToValidate(schema),
    processValidate
  ];

export default validateMiddleWare;