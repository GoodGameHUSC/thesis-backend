const app = require('express');
import ProductModel from '../../database/models/Product';
import { check } from 'express-validator';
import validate from '../../middleware/validator/index';
const router = app.Router();


router.get('/get',
  validate([
    check('cellphone').not().isEmpty(),
    check('country_code').not().isEmpty()
  ]),
  async (req, res, next) => {
    try {

      const { limit, page, category_id } = req.body;
      let query = {};
      let result = await ProductModel.paginateQuery(query, page, limit)
      res.paginate(result);
    } catch (error) {
      next(error)
    }
  })
module.exports = router;




