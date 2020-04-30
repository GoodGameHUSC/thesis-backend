const app = require('express');
import CategoryModel from '../../database/models/Category';
import validate from '../../middleware/validator/index';
import { check } from 'express-validator';
const router = app.Router();


router.post('/get',
  validate([
    check('cellphone').not().isEmpty(),
    check('country_code').not().isEmpty()
  ]),
  async (req, res, next) => {
    try {
      const { limit, page, category_id } = req.body;
      let query = {};
      const options = {
        page: 1,
        limit: 10,
        collation: {
          locale: 'en'
        }
      };
      let result = await CategoryModel.paginate(query, options)
      res.paginate(result);

    } catch (error) {
      next(error)
    }
  })
module.exports = router;
