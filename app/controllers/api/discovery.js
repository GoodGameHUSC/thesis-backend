const app = require('express');
import validate from '../../middleware/validator/index';
import { check } from 'express-validator';
const router = app.Router();
const mongoose = require('mongoose')

const schemaInformation = (modelName, expanded = false) => Object.values(require('mongoose').model(modelName).schema.paths).map((child) => {
  if (expanded) return child;
  let info = {
    path: child.path,
    type: child.instance
  }
  if (child['$isMongooseArray'] && child['$embeddedSchemaType']) info = { ...info, children_type: child['$embeddedSchemaType'].instance }
  return info
});

router.get('/viewModel',
  validate([
    check('cellphone').not().isEmpty(),
    check('country_code').not().isEmpty()
  ]),
  async (req, res, next) => {
    try {
      const { modelName, expanded } = req.query;
      const listModel = mongoose.modelNames();
      if (modelName) {
        if (!listModel.includes(modelName)) {
          return res.success({
            error: `Not existed model name ${modelName}, please try one in list below`,
            available_model: listModel
          });
        }
        else return res.success(schemaInformation(modelName, expanded))
      }
      let rs = {};
      listModel.forEach(model => { rs[model] = schemaInformation(model, expanded) })
      return res.success(rs);
    } catch (error) {
      next(error)
    }
  })
module.exports = router;




