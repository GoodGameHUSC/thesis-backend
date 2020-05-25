const app = require('express');
import CategoryModel from '../../database/models/Category';
import validate from '../../middleware/validator/index';
import { check } from 'express-validator';
import ProductModel from '../../database/models/Product';
import responseCode from '../../config/responseCode';
const router = app.Router();


router.get('/get',
  // validate([
  // check('cellphone').not().isEmpty(),
  // check('country_code').not().isEmpty()
  // ]),
  async (req, res, next) => {
    try {
      const { limit, page, select = 'name image', sort = 'name' } = req.query;
      let query = {};
      let result = await CategoryModel.paginateQuery(query, page, limit, { select, sort })
      res.paginate(result);

    } catch (error) {
      next(error)
    }
  })

router.get('/detail',
  async (req, res, next) => {
    try {
      const { limit, page, select = 'name image', sort = 'name', id } = req.query;
      let category = await CategoryModel.findById(id).select(select);
      if (!category) return res.errors("Not found", 404, responseCode.results.notFound)
      let products = await ProductModel.find({ category_id: id }).limit(20)
      let result = { category, products }
      return res.success(result);

    } catch (error) {
      next(error)
    }
  })
module.exports = router;
