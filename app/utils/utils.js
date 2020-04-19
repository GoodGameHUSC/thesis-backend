
import { SemanticError } from 'app/definitions/exceptions';
import modelName from 'config/modelName';
import { Sequelize } from 'sequelize';
const utils = {

  modelName: modelName,

  isObject: (object) => {
    return !!object || typeof object != 'object' || typeof object == 'function'
  },

  hasProperties: (object, property) => {
    if (utils.isObject(object)) {
      return object.hasOwnProperty(property);
    }
    return false;
  },

  isModel: (object, type = null) => {
    if (type == null)
      return object instanceof Sequelize.Model
    if (object instanceof Sequelize.Model) {
      if (type == utils.modelName.Users)
        return object.constructor.name === utils.modelName.Customers || object.constructor.name === utils.modelName.Providers
      return object.constructor.name === type
    }
    return false;
  },

  isUser: (user) => utils.isModel(user, utils.modelName.Users),

  getAttr: (o, ...p) => {
    try {
      return p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, o)
    } catch (error) {
      return null;
    }
  },
  round2: (value) => Math.round(value * 100) / 100,
  floor2: (value) => Math.floor(value * 100) / 100,
  ceil2: (value) => Math.ceil(value * 100) / 100,

  newDate: (timestamp, strict = false) => {
    if (isNaN(timestamp)) throw new SemanticError("unable_parse_time", "Invalid time format")
    // SHIT CODE
    if (strict) {
      if (timestamp < 946659600) throw new SemanticError("unable_parse_time", "Can not select a time before 2000")
      else if (timestamp <= 9999999999) return new Date(timestamp * 1000);
    }
    return new Date(timestamp);
  }
}

export default utils;