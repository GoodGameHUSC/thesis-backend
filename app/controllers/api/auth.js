const app = require('express');
import ProductModel from '../../database/models/Product';
import { check } from 'express-validator';
import validate from '../../middleware/validator/index';
import UserModel from '../../database/models/User';
import { getAccessToken, expireTime, requireLogin } from '../../middleware/http/requireLogin.js';
import { Hashing } from '../../service/libs/authentication';
import { randomVerifyCode } from '../../utils/random'

const router = app.Router();


router.post('/signup',
  validate([
    check('username', 'Vui lòng nhập tên đăng nhập').not().isEmpty(),
    check('email', 'Vui lòng nhập email').not().isEmpty()
      .isEmail().withMessage("Email không hợp lệ"),
    check('phone', 'Vui lòng nhập số điện thoại').not().isEmpty()
      .isMobilePhone('vi-VN').withMessage("Số điện thoại được sử dụng không hợp lệ"),
    check('password', 'Vui lòng nhập mật khẩu').not().isEmpty()
      .isLength({ min: 6, max: 50 }).withMessage("Mật khẩu phải có độ dài hơn từ 6 đến 50 kí tự"),
    check('password_confirm', 'Vui lòng xác nhận mật khẩu').not().isEmpty(),
    check('password_confirm', 'Mật khẩu xác nhận không trùng khớp')
      .exists()
      .custom((value, { req }) => value === req.body.password)
  ]),
  async (req, res, next) => {
    try {
      const { username, email, phone, password } = req.body;

      let user = await UserModel.findOne().or([{ email }, { username }]);
      if (user) return res.errors("Email hoặc số điện thoại đã được sử dụng")
      email.toLowerCase();
      const passwordHashed = await Hashing.encrypt(password);
      let newUser = new UserModel({
        username,
        email,
        phone,
        password: passwordHashed
      })
      await newUser.save()

      const token = getAccessToken(newUser);
      return res.success({
        token: {
          access_token: token,
          type: 'Bearer',
          expireIn: expireTime * 24 * 3600
        },
        user: newUser
      });
    } catch (error) {
      next(error)
    }
  })

router.post('/login',
  validate([
    check('credential', 'Vui lòng nhập tên đăng nhập/email').not().isEmpty(),
    check('password', 'Vui lòng nhập mật khẩu').not().isEmpty()
  ]),
  async (req, res, next) => {
    try {
      let { credential, password } = req.body;
      credential = credential.toLowerCase();
      password = password.toLowerCase();
      let user = await UserModel.findOne().or([{ email: credential }, { username: credential }]);
      if (!user) return res.errors("Thông tin đăng nhập không chính xác")

      const check = await Hashing.check(password, user.password);
      if (!check) return res.errors("Thông tin đăng nhập không chính xác")
      const token = getAccessToken(user);
      return res.success({
        token: {
          access_token: token,
          type: 'Bearer',
          expireIn: expireTime * 24 * 3600
        },
        user
      });
    } catch (error) {
      next(error)
    }
  })


// TODO: need Test
router.post('/forgot-password',
  validate([
    check('email', 'Vui lòng nhập địa chỉ email của bạn').not().isEmpty().isEmail().withMessage("Email không hợp lệ"),
  ]), async (req, res, next) => {
    try {
      let { action } = req.body;

      switch (action) {
        case "REQUIRE": if (true) {
          let { email } = req.body;
          let user = await UserModel.findOne({ email: email });
          if (!user) return res.errors("Địa chỉ email không tồn tại trong hệ thống")

          const code = randomVerifyCode()
          user.secret_info.change_password_verify_code = code;
          user.secret_info.change_password_issue_at = new Date();
          user.save();

          return res.success({
            code: code
          })
        };
        case "VERIFY": if (true) {
          let { email, code } = req.body;
          let user = await UserModel.findOne({ email: email });
          if (!user) return res.errors("Địa chỉ email không tồn tại trong hệ thống")

          if (
            user.secret_info.change_password_verify_code === code
            && user.secret_info.change_password_issue_at
          ) {
            if (user.secret_info.change_password_issue_at.getTime() < now()) {
              const token = randomString(10)
              user.secret_info.change_password_token = token;
              await user.save();
              return res.success({ token });
            }
            else return res.errors("Mã xác thực đã hết hạn")
          } else return res.errors("Mã xác thực không chính xác")
        };
        case "CHANGE_PASSWORD": if (true) {
          let { email, token, new_pass } = req.body;
          let user = await UserModel.findOne({ email: email });
          if (!user) return res.errors("Địa chỉ email không tồn tại trong hệ thống")
          if (user.secret_info.change_password_token === token) {
            user.password = await Hashing.encrypt(password);
            await user.save();
            res.success();
          } else return res.error("Tác vụ thất bại, vui lòng liên hệ tổng đài tư vấn để được trợ giúp")
        };
        default: return res.errors("Chưa rõ hành động yêu cầu")
      }
    } catch (error) {
      next(error)
    }
  })

module.exports = router;




