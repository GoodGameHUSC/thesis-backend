const app = require('express');
import { requireLogin } from '../../middleware/http/requireLogin.js';
import Payment from '../../service/libs/payment';
import { check } from 'express-validator';
import validate from '../../middleware/validator/index';

const router = app.Router();
const mongoose = require('mongoose');


router.post('/stripe/init_account',
  requireLogin,
  async (req, res, next) => {
    try {
      const user = req.user;
      const account = await Payment.createStripeAccountWithEmail(user.username, user.email)
      user.payment_account.push({
        type: 'stripe', info: {
          stripe_account_id: account.id
        }
      });
      await user.save()
      res.success();
    } catch (error) {
      console.log(error)
      next(error)
    }
  })

router.get('/stripe/list-card',
  requireLogin,
  async (req, res, next) => {
    try {
      const stripe_account_id = req.user.stripe_account_id;
      if (!stripe_account_id) res.errors("Bạn phải đồng ý sử dụng phương thức thẻ tín dụng trước khi có thể tiếp tục")
      const list_card = await Payment.listCardOfUser(stripe_account_id)
      res.success(list_card);
    } catch (error) {
      console.log(error)
      next(error)
    }
  })

router.post('/stripe/add-card',
  requireLogin,
  validate([
    check('token', 'Vui lòng nhập đủ thông tin thẻ').not().isEmpty(),
  ]),
  async (req, res, next) => {
    try {
      const { token } = req.body;

      const stripe_account_id = req.user.stripe_account_id;
      if (!stripe_account_id) res.errors("Bạn phải đồng ý sử dụng phương thức thẻ tín dụng trước khi có thể tiếp tục")

      const card = await Payment.addCardToUser(token, stripe_account_id);

      return res.success(card);
    } catch (error) {
      console.log(error)
      next(error)
    }
  })

router.post('/stripe/test-token',
  requireLogin,
  async (req, res, next) => {
    try {
      return res.success(await Payment.createTestToken());
    } catch (error) {
      console.log(error)
      next(error)
    }
  })

router.post('/stripe/remove-card',
  requireLogin,
  validate([
    check('card_id', 'Vui lòng chọn thẻ muốn xoá').not().isEmpty(),
  ]),
  async (req, res, next) => {
    try {

      const { card_id } = req.body;
      const stripe_account_id = req.user.stripe_account_id;
      if (!stripe_account_id) res.errors("Bạn phải đồng ý sử dụng phương thức thẻ tín dụng trước khi có thể tiếp tục")

      await Payment.removeCardOfUser(card_id, stripe_account_id);
      return res.success();
    } catch (error) {
      console.log(error)
      next(error)
    }
  })

router.post('/stripe/create-charge',
  requireLogin,
  validate([
    check('data', 'Thông tin yêu cầu không hợp lệ').not().isEmpty(),
  ]),
  async (req, res, next) => {
    try {

      const stripe_account_id = req.user.stripe_account_id;
      if (!stripe_account_id) res.errors("Bạn phải đồng ý sử dụng phương thức thẻ tín dụng trước khi có thể tiếp tục")

      const charge = await Payment.createChargeWithObject({ ...req.body.data, stripe_customer_id: stripe_account_id });
      return res.success(charge);
    } catch (error) {
      console.log(error)
      next(error)
    }
  })


module.exports = router;




