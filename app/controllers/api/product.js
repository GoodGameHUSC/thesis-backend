const app = require('express');
import { check } from 'express-validator';
import ProductModel from '../../database/models/Product';
import { requireLogin } from '../../middleware/http/requireLogin.js';
import validate from '../../middleware/validator/index';
import { Hashing } from '../../service/libs/authentication';
import RatingModel, { RatingReplyModel } from '../../database/models/Rating';
import ShopModel from '../../database/models/Shop';
const router = app.Router();


router.get('/get',
  // validate([
  //   check('cellphone').not().isEmpty(),
  //   check('country_code').not().isEmpty()
  // ]),
  async (req, res, next) => {
    try {

      const { limit, page, select, category_id } = req.query;
      let selected = select || null
      // let randomPriceRangeMin = Math.round((1000 + Math.random() * 10000))
      let randomPriceRangeMin = 10000;
      // let randomPriceRangeMax = Math.round((11000 + Math.random() * 100000000))
      let randomPriceRangeMax = 1000000;
      let query = {
        price: {
          $gte: randomPriceRangeMin,
          $lte: randomPriceRangeMax
        }
      };
      console.log(query);
      let result = await ProductModel.paginateQuery(query, page, limit, { select: selected, sort: '-description' })
      res.paginate(result);
    } catch (error) {
      next(error)
    }
  })


router.get('/top_product',
  async (req, res, next) => {
    try {
      const { limit = 6, page = 1, select = null } = req.query;
      let query = {};
      let result = await ProductModel.paginateQuery(query, page, limit, {
        select, sort: '-visited_number'
      })
      res.paginate(result);
    } catch (error) {
      next(error)
    }
  })

router.get('/detail',
  async (req, res, next) => {
    try {
      const { select, id } = req.query;
      let selected = select || null
      let instance = await ProductModel.findById(id);

      // TODO: Remove after several request
      if (!instance.shop) {
        instance.shop = '5edeead3a5a7e1331d8812a8';
        await instance.save();
      }

      let result = await ProductModel.findById(id).select(selected).populate('shop');
      res.success(result);
    } catch (error) {
      next(error)
    }
  })

router.get('/relate_product',
  async (req, res, next) => {
    try {
      const { limit = 6, page = 1, id, select = null } = req.query;
      const product = await ProductModel.findById(id);
      if (!product) return res.errors("Require product id");

      let category_id = product.category_id;
      let query = {
        category_id
      };
      let result = await ProductModel.paginateQuery(query, page, limit, {
        select, sort: 'name'
      })
      res.paginate(result);
    } catch (error) {
      next(error)
    }
  })


router.get('/search',
  async (req, res, next) => {
    try {
      const { limit = 20, page = 1, keyword = '', select = null, category_id } = req.query;

      let query = {
        $text: { $search: keyword },
      };

      if (category_id) query.category_id = category_id;
      let result = await ProductModel.paginateQuery(query, page, limit, {
        select, sort: 'name'
      })
      res.paginate(result);
    } catch (error) {
      next(error)
    }
  })


router.post('/create-rating',
  requireLogin,
  validate([
    check('product_id').not().isEmpty(),
    check('content').not().isEmpty(),
    check('star').not().isEmpty()
  ]),
  async (req, res, next) => {
    try {
      const { product_id, content, star } = req.body;
      const user = req.user;

      const previous_rating = await RatingModel.findOne({ product_id, user_id: user.id });
      if (previous_rating) return res.errors("Bạn đã đánh giá sản phẩm này trước đó");

      const rating = new RatingModel({
        user_id: user.id,
        product_id,
        content,
        star,
        image: '',
        replies: [],
        quick_reviews: []
      })

      await rating.save();

      res.success(rating);
    } catch (error) {
      console.log(error)
      next(error)
    }
  })

router.post('/reply-rating',
  requireLogin,
  validate([
    check('rating_id').not().isEmpty(),
    check('content').not().isEmpty(),
  ]),
  async (req, res, next) => {
    try {
      const { rating_id, content } = req.body;

      const rating = await RatingModel.findOne({ _id: rating_id });
      if (!rating) return res.errors("Đánh giá không tồn tại hoặc đã bị xoá");

      const reply = new RatingReplyModel({
        rating_id,
        content,
        image: '',
        createdAt: new Date()
      })

      rating.replies.push(reply);
      await rating.save();

      res.success(rating);
    } catch (error) {
      console.log(error)
      next(error)
    }
  })


router.get('/view-rating',
  validate([
    check('product_id').not().isEmpty(),
  ]),
  async (req, res, next) => {
    try {
      const { product_id, limit = 20, page = 1, select = null } = req.query;

      let query = {
        product_id
      };

      let result = await RatingModel.paginateQuery(query, page, limit, {
        select, sort: '-createdAt'
      })
      res.paginate(result);
    } catch (error) {
      next(error)
    }
  })
module.exports = router;




