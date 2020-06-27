const app = require('express');
import { requireLogin } from '../../middleware/http/requireLogin.js';
import { Address } from '../../definitions/sequelize/address';
import responseCode from '../../config/responseCode';
import UserModel, { CartModel } from '../../database/models/User';

import { check } from 'express-validator';
import validate from '../../middleware/validator/index';
import { Hashing } from '../../service/libs/authentication';
import ShopModel from '../../database/models/Shop';
import ProductModel, { GalleryModel } from '../../database/models/Product';
import uploader from '../../middleware/http/uploadFile';
import RatingModel from '../../database/models/Rating';
import { FireBaseStorage } from '../../service/libs/firebase';

const router = app.Router();
const mongoose = require('mongoose');


router.post('/create-shop',
  requireLogin,
  async (req, res, next) => {
    try {
      const user = req.user;

      const currentShop = await ShopModel.findOne({ master_id: user._id, is_active: true });

      if (currentShop) return res.errors("Bạn chỉ có thể quản lý 1 cửa hàng tại 1 thời điểm");

      const { name, slogan, phone_number, address, website_url, email, brand_image } = req.body;

      const shop = new ShopModel({
        master_id: user._id,
        name,
        slogan,
        phone_number,
        address,
        email,
        website_url,
        is_active: true,
        brand_image: brand_image ? brand_image : 'https://png.pngtree.com/png-clipart/20190516/original/pngtree-vector-shop-icon-png-image_3762863.jpg',
        brand_background: 'https://is4.revolveassets.com/images/up/2020/June/060820_f_soontosellout_01.jpg',
        average_rate: null,
        rates: []
      })

      await shop.save();

      user.shop = shop._id;

      await user.save();
      return res.success(shop, 'Tạo cửa hàng thành công');
    } catch (error) {
      console.log(error)
      next(error)
    }
  })


router.post('/create-product',
  requireLogin,
  uploader.array('images', 12),
  async (req, res, next) => {
    try {
      const user = req.user;
      const currentShop = await ShopModel.findOne({ master_id: user._id, is_active: true });

      const { name, brand, description, category_id, price_real, discount, amount, net } = req.body;

      try {

        const gallery = await Promise.all(
          req.files.map(async (file) => {
            try {
              file.buffer = await resizeImageBuffer(file.buffer, 400, null);
            } catch (error) {
              console.log("Unable to resize, still upload origin image");
            }
            let url = await FireBaseStorage.uploadFileToRef(file, 'images/profiles/');
            return new GalleryModel({
              link: url
            })
          })
        )

        const product = new ProductModel({
          name,
          brand,
          description,
          price: price_real,
          discount,
          category_id,
          rating: [0, 1],
          sold_number: 0,
          gallery,
          status: 1,
          amount,
          net,
          shop: currentShop.id
        })
        await product.save();
        return res.success(product, 'Tạo sản phẩm thành công');
      } catch (error) {
        console.log(error);
        return res.errors("Tạo sản phẩm không thành công");
      }
    } catch (error) {
      console.log(error)
      next(error)
    }
  })


router.get('/view-shop',
  async (req, res, next) => {
    try {
      const { id } = req.query;
      const shop = await ShopModel.findOne({ _id: id, is_active: true });

      if (!shop) return res.errors("Không tìm thấy cửa hàng");

      const master = await UserModel.findById({ _id: shop.master_id })
      const products = await ProductModel.find({
        shop: id,
        status: {
          $ne: -1
        }
      }).sort('-createdAt');

      return res.success({ info: shop, products, master });
    } catch (error) {
      console.log(error)
      next(error)
    }
  })

router.post('/update-shop/:id',
  requireLogin,
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const shop = await ShopModel.findOne({ _id: id, is_active: true });

      if (!shop) return res.errors("Không tìm thấy cửa hàng");

      const { name, slogan, phone_number, address, website_url } = req.body;

      shop.name = name ? name : shop.name;
      shop.slogan = slogan ? slogan : shop.slogan;
      shop.phone_number = phone_number ? phone_number : shop.phone_number;
      shop.address = address ? address : shop.address;
      shop.website_url = website_url ? website_url : shop.website_url;

      await shop.save();

      return res.success(shop);
    } catch (error) {
      console.log(error)
      next(error)
    }
  })

router.post('/remove-shop/:id',
  requireLogin,
  async (req, res, next) => {
    try {

      const id = req.params.id;
      const shop = await ShopModel.findOne({ _id: id, is_active: true });

      if (!shop) return res.errors("Không tìm thấy cửa hàng");

      shop.is_active = false;
      await shop.save();

      return res.success();
    } catch (error) {
      console.log(error)
      next(error)
    }
  })


router.get('/view-products/:id',
  requireLogin,
  async (req, res, next) => {
    try {
      const { limit = 20, page = 1, keyword = '', select = null, category_id } = req.query;
      const id = req.params.id;
      let query = {
        shop: id,
        status: {
          $ne: -1
        }
      };

      if (category_id) query.category_id = category_id;
      let result = await ProductModel.find(query)
      res.paginate(result);
    } catch (error) {
      console.log(error)
      next(error)
    }
  })

router.get('/view-detail/:shop_id/product/:product_id',
  requireLogin,
  async (req, res, next) => {
    try {
      const { shop_id, product_id } = req.params.id;
      const query = {
        _id: product_id,
        shop: shop_id
      };
      let result = await ProductModel.findOne(query).populate('shop');
      if (!result) return res.errors("Không tìm thấy sản phẩm");
      return res.success(result);
    } catch (error) {
      console.log(error)
      next(error)
    }
  })

router.post('/remove-product',
  requireLogin,
  async (req, res, next) => {
    try {
      const { shop_id, product_id } = req.body;
      debugger;
      const query = {
        _id: product_id,
        shop: shop_id
      };
      let result = await ProductModel.findOne(query).populate('shop');
      if (!result) return res.errors("Không tìm thấy sản phẩm");

      result.status = -1;
      await result.save();
      return res.success();
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
)

module.exports = router;