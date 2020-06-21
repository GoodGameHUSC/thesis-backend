const app = require('express');
import { requireLogin } from '../../middleware/http/requireLogin.js';
import { Address } from '../../definitions/sequelize/address';
import responseCode from '../../config/responseCode';
import UserModel from '../../database/models/User';

import { check } from 'express-validator';
import validate from '../../middleware/validator/index';
import { Hashing } from '../../service/libs/authentication';
import OrderModel, { BillModel } from '../../database/models/Order';

const router = app.Router();
const mongoose = require('mongoose');

router.post('/create-order',
  requireLogin,
  async (req, res, next) => {
    try {
      const user = req.user;
      const { orders, address, ship_method, payment_method } = req.body;

      await Promise.all(orders.map(order => {
        debugger;
        const bill = new BillModel({
          sub_total: order.bill.sub_total,
          tax: order.bill.tax,
          total: order.bill.total,
          bill_detail: order.bill.bill_detail,
          createdAt: new Date(),
          payment_method: payment_method,
          status: 0,
        })

        const orderRecord = new OrderModel({
          user_id: user._id,
          shop: order.shop_id,
          amount: order.amount,
          product: order.product_id,
          receive_address: address._id,
          delivery_method: ship_method._id,
          notes: order.notes,
          status: 0,
          bill: bill,
          voucher: [order.voucher],
          milestone: []
        })

        return orderRecord.save();
      }));

      res.success();

    } catch (error) {
      console.log(error)
      next(error)
    }
  });

router.get('/all',
  requireLogin,
  async (req, res, next) => {
    try {
      const user = req.user;
      const { status } = req.query;

      let query = { user_id: user._id }
      if (status) query = { ...query, status }
      const orders = await OrderModel.find(query).populate('shop').populate('product');

      res.success(orders);
    } catch (error) {
      console.log(error)
      next(error)
    }
  });


router.get('/detail/{id}',
  requireLogin,
  async (req, res, next) => {
    try {
      const user = req.user;
      const { id } = req.params;

      let query = { user_id: user._id, id }
      const orders = await OrderModel.findById(query);

      res.success(orders);
    } catch (error) {
      console.log(error)
      next(error)
    }
  });

router.post('/add-wishlist',
  requireLogin,
  async (req, res, next) => {
    try {
      const user = req.user;
      const { product_id } = req.body;
      const current_wishlist = user.wishlist || [];

      let existed = false;
      current_wishlist.forEach(element => {
        if (element._id == product_id)
          existed = true
      });
      if (existed) return res.success();

      await UserModel.update({ _id: user._id }, { $addToSet: { wishlist: { _id: product_id, createdAt: new Date() } } })
      res.success();
    } catch (error) {
      console.log(error)
      next(error)
    }
  });

router.post('/remove-wishlist',
  requireLogin,
  async (req, res, next) => {
    try {
      const user = req.user;
      const { product_id } = req.body;
      await UserModel.update({ _id: user._id }, { $pull: { wishlist: { _id: product_id } } })
      res.success();
    } catch (error) {
      console.log(error)
      next(error)
    }
  });

module.exports = router;




