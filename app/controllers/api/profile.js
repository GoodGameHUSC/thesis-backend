const app = require('express');
import { requireLogin } from '../../middleware/http/requireLogin.js';
import { Address } from '../../definitions/sequelize/address';
import responseCode from '../../config/responseCode';
import UserModel from '../../database/models/User';

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

module.exports = router;




