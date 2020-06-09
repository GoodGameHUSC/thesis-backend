const app = require('express');
import { requireLogin } from '../../middleware/http/requireLogin.js';
import { Address } from '../../definitions/sequelize/address';
import responseCode from '../../config/responseCode';
import UserModel, { CartModel } from '../../database/models/User';

import { check } from 'express-validator';
import validate from '../../middleware/validator/index';
import { Hashing } from '../../service/libs/authentication';

const router = app.Router();
const mongoose = require('mongoose');


router.get('/me',
  requireLogin,
  async (req, res, next) => {
    try {
      return res.success(req.user);
    } catch (error) {
      console.log(error)
      next(error)
    }
  })

router.post('/update-profile',
  requireLogin,
  async (req, res, next) => {
    try {
      const { username } = req.body;
      const user = req.user;
      if (username) {
        user.username = username;
        user.save();
      }
      return res.success(req.user);
    } catch (error) {
      console.log(error)
      next(error)
    }
  })

router.post('/update-address',
  requireLogin,
  async (req, res, next) => {
    try {
      const { action } = req.body;
      const user = req.user;
      const list_address = user.address_book || [];
      switch (action) {
        case 'ADD':
          if (true) {
            const { data } = req.body;
            const newRecord = new Address(mongoose.Types.ObjectId(), data.location, data.address, data.phone, data.additional_info);
            list_address.push(newRecord);
            user.list_address = list_address;
            await user.save();
            return res.success();
          }
        case 'UPDATE':
          if (true) {
            const { id, data } = req.body;
            user.address_book[0].address = data.address;
            await user.save()
            return res.success();
          }
        case 'REMOVE':
          if (true) {
            const { id } = req.body;
            user.address_book.pull(id);
            await user.save();
            return res.success();
          }
        default: return res.errors("Missing action", 400, responseCode.params.invalid);
      }
    } catch (error) {
      console.log(error)
      next(error)
    }
  })

router.post('/update-password',
  requireLogin,
  validate([
    check('password').not().isEmpty(),
    check('new_password').not().isEmpty()
  ]),
  async (req, res, next) => {
    try {
      const { password, new_password } = req.body;
      const user = req.user;

      const check = await Hashing.check(password, user.password);
      if (!check) return res.errors("Mật khẩu không chính xác");

      const passwordHashed = await Hashing.encrypt(new_password);

      user.password = passwordHashed;
      await user.save();

      res.success();
    } catch (error) {
      console.log(error)
      next(error)
    }
  })

router.post('/update-app-setting',
  requireLogin,
  async (req, res, next) => {
    try {
      const { setting } = req.body;
      const user = req.user;
      const new_setting = { ...user.setting, ...setting };
      user.setting = new_setting;
      await user.save();
      return res.success(user);
    } catch (error) {
      console.log(error)
      next(error)
    }
  })

router.post('/synchronise-cart',
  requireLogin,
  async (req, res, next) => {
    try {
      const { carts } = req.body;
      const current_carts = req.user.carts;

      const match_cart = (cart) => {
        current_carts.some(element => element.product_id == cart.product_id)
      }
      Promise.all(
        carts.map((cart_local) => {
          let current_cart = match_cart(cart_local);
          if (current_cart) {
            if (current_cart.amount != cart_local.amount) {
              current_cart.amount = cart_local.amount
              return current_cart.save();
            }
          } else {
            const new_cart = new CartModel({
              product_id: cart_local.product._id,
              product_snapshot: cart_local.product,
              amount: cart_local.amount
            })
            return new_cart.save();
          }
        })
      )
      return res.success(user);
    } catch (error) {
      console.log(error)
      next(error)
    }
  })


module.exports = router;