const app = require('express');
import { check } from 'express-validator';
import ProductModel from '../../database/models/Product';
import { requireLogin, retrieveUser } from '../../middleware/http/requireLogin.js';
import validate from '../../middleware/validator/index';
import { Hashing } from '../../service/libs/authentication';
import RatingModel, { RatingReplyModel } from '../../database/models/Rating';
import OrderModel from '../../database/models/Order';
import ShopModel from '../../database/models/Shop';
import NLPService from '../../service/nlp/index';
import SAResultS from '../../database/models/SAResult';
import uploader from '../../middleware/http/uploadFile';
import { FireBaseStorage } from '../../service/libs/firebase';
import resizeImageBuffer from '../../service/libs/resize_image';
const router = app.Router();


router.get('/get',
  retrieveUser,
  // validate([
  //   check('cellphone').not().isEmpty(),
  //   check('country_code').not().isEmpty()
  // ]),
  async (req, res, next) => {
    try {

      const { limit, page, select, category_id } = req.query;
      const user = req.user;
      let selected = select || null
      // let randomPriceRangeMin = Math.round((1000 + Math.random() * 10000))
      let randomPriceRangeMin = 10000;
      // let randomPriceRangeMax = Math.round((11000 + Math.random() * 100000000))
      let randomPriceRangeMax = 1000000;

      let query = {
        price: {
          $gte: randomPriceRangeMin,
          $lte: randomPriceRangeMax
        },
        status: {
          $ne: -1
        }
      };

      let mapped = null;
      if (user) {
        const interested = user.interested || [];
        if (interested.length > 0) {
          mapped = interested.slice(0, 10).map(e => e.keyword);
          let searchString = mapped.join(' ').trim();
          query = { ...query, $text: { $search: searchString } }
        }
      }

      let result = await ProductModel.paginateQuery(query, page, limit, { select: selected, sort: '-name' })

      const docs = result.docs;
      docs.sort((a, b) => {
        mapped
      })
      debugger;
      res.paginateAdditional(result, 'OK', 200, { interested: mapped });
    } catch (error) {
      next(error)
    }
  })


router.get('/top_product',
  async (req, res, next) => {
    try {
      const { limit = 6, page = 1, select = null } = req.query;
      let query = {
        status: {
          $ne: -1
        }
      };
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
      const rating = await RatingModel.find({ product: id }).populate('user', 'username avatar', null, null, { sort: '-createdAt', limit: 2 });

      // TODO: Remove after several request
      if (!instance.shop) {
        instance.shop = '5edf03061592673c2ffcf678';
        await instance.save();
      }

      let result = await ProductModel.findById(id).select(selected).populate('shop');

      // result.rates = rating;

      res.success({ product: result, rating });
    } catch (error) {
      next(error)
    }
  })

router.get('/detail-for-admin',
  async (req, res, next) => {
    try {
      const { select, id } = req.query;
      let selected = select || null
      let instance = await ProductModel.findById(id);
      const rating = await RatingModel.find({ product: id }).populate('user', 'username avatar', null, null, { sort: '-createdAt', limit: 2 });

      // TODO: Remove after several request
      if (!instance.shop) {
        instance.shop = '5edf03061592673c2ffcf678';
        await instance.save();
      }

      let result = await ProductModel.findById(id).select(selected).populate('shop');

      // result.rates = rating;

      res.success({ product: result, rating });
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
        category_id,
        status: {
          $ne: -1
        }
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
  retrieveUser,
  async (req, res, next) => {
    try {
      const { limit = 20, page = 1, keyword = '', select = null, category_id } = req.query;

      let query = {
        $text: { $search: keyword },
        status: {
          $ne: -1
        }
      };

      if (category_id) query.category_id = category_id;
      let result = await ProductModel.paginateQuery(query, page, limit, {
        select, sort: 'name'
      })
      res.paginate(result);

      if (req.user) NLPService.IEforUser(keyword, req.user);
    } catch (error) {
      next(error)
    }
  })


router.post('/create-rating',
  requireLogin,
  uploader.single('image'),
  validate([
    check('product_id').not().isEmpty(),
    check('content').not().isEmpty(),
    check('star').not().isEmpty()
  ]),
  async (req, res, next) => {
    try {
      const { order_id, product_id, content, star } = req.body;
      const user = req.user;

      // const previous_rating = await RatingModel.findOne({ product: product_id, user: user.id });
      // if (previous_rating) return res.errors("Bạn đã đánh giá sản phẩm này trước đó");

      const rating = new RatingModel({
        user: user.id,
        product: product_id,
        content,
        star,
        image: '',
        replies: [],
        quick_reviews: []
      })

      try {
        if (req.file) {
          try {
            req.file.buffer = await resizeImageBuffer(req.file.buffer, 400, null);
          } catch (error) {
            console.log("Unable to resize, still upload origin image");
          }
          let url = await FireBaseStorage.uploadFileToRef(req.file, 'images/profiles/');
          rating.image = url;
        }
      } catch (error) {
        console.log(error);
      }
      await rating.save();

      try {
        const order = await OrderModel.findById(order_id);
        order.rating = rating.id;
        await order.save();
      } catch (error) {

      }

      res.success(rating);

      const { result } = await NLPService.sentiment_analysis(content);

      if (result) {
        rating.sentiment = result.label;
        await rating.save();
        let saved_result = new SAResultS({
          content: content,
          language: result.language,
          label: result.label
        })
        await saved_result.save();
      }

      await NLPService.IEforUser(content, user);

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
        product: product_id
      };

      let result = await RatingModel.paginateQuery(query, page, limit, {
        select,
        populate: { path: 'user', select: 'username avatar' },
        sort: '-createdAt'
      })
      res.paginate(result);
    } catch (error) {
      next(error)
    }
  })
module.exports = router;




