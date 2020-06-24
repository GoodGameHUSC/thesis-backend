import env from '../../config/env';
import responseCode from '../../config/responseCode';
const jwt = require('jsonwebtoken');
import UserModel from '../../database/models/User';
const headerFieldBeUse = 'authorization';
export const expireTime = 90
const expiresIn = `${expireTime} days`;

export const requireLogin = async (req, res, next) => {
  // check access token
  if (!req.headers[headerFieldBeUse]) {
    return res.errors("Yêu cầu đăng nhập", 400, responseCode.auth.require_login)
  }

  try {
    const userId = jwt.verify(req.headers[headerFieldBeUse], env.SECRET_JWT).id;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.errors("Yêu cầu đăng nhập", 401, responseCode.auth.require_login)
    }
    req.user = user;
    req.userId = userId;
    next();
  } catch (err) {
    next(err);
  }
};

export const retrieveUser = async (req, res, next) => {
  try {
    if (req.headers[headerFieldBeUse]) {
      const userId = jwt.verify(req.headers[headerFieldBeUse], env.SECRET_JWT).id;
      const user = await UserModel.findById(userId);
      if (user) {
        req.user = user;
        req.userId = userId;
      }
      next();
    } else next();
  } catch (err) {
    next(err);
  }
};

export function getAccessTokenHeader(user) {
  const token = jwt.sign({ id: user._id }, env.SECRET_JWT, { expiresIn: expiresIn });
  return { [headerFieldBeUse]: token };
}

export function getAccessToken(user) {
  const token = jwt.sign({ id: user._id }, env.SECRET_JWT, { expiresIn: expiresIn })
  return token;
}

// export default requireLogin;