const app = require('express');
import ProductModel from '../../../database/models/Product';
const router = app.Router();


router.post('/get',
  // validate([
  //   check('cellphone').not().isEmpty(),
  //   check('country_code').not().isEmpty()
  // ]),
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
      let result = await ProductModel.paginate(query, options)
      console.log(result);

      res.success(result);

    } catch (error) {
      next(error)
    }
  })
module.exports = router;




