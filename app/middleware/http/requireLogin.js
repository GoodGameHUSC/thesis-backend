import env from '../../../config/env';
import responseCode from '../../../config/responseCode';
import db from '../../../models/index';
import message from '../../definitions/constants/MESSAGE';
const jwt = require('jsonwebtoken');
const headerFieldBeUse = 'authorization';
export const expireTime = 90
const expiresIn = `${expireTime} days`;

const requireLogin = async (req, res, next) => {
  // check access token
  if (!req.headers[headerFieldBeUse]) {
    return res.errors(message.requireLogin, 400, responseCode.auth.require_login)
  }

  try {
    // retrieve user id and user object from db
    const userId = jwt.verify(req.headers[headerFieldBeUse] || '', env.SECRET_JWT).id;

    const user = await db.Customers.scope('public').findByPk(userId);
    if (!user) {
      return res.errors(message.requireLogin, 401, responseCode.auth.require_login)
    }

    // pass user in request body
    req.user = user;
    req.userId = userId;
    next();
  } catch (err) {
    next(err);
    console.log(err);
  }
};

export const retrieveUser = async (req, res, next) => {


  try {
    if (req.headers[headerFieldBeUse]) {
      const userId = jwt.verify(req.headers[headerFieldBeUse] || '', env.SECRET_JWT).id;

      const user = await db.Customers.scope('public').findByPk(userId);
      if (user) {
        req.user = user;
        req.userId = userId;
        next();
      }
    } else next();
  } catch (err) {
    next(err);
    console.log(err);
  }
};

export function getAccessTokenHeader(user) {
  const token = jwt.sign({ id: user.id }, env.SECRET_JWT, { expiresIn: expiresIn });
  return { [headerFieldBeUse]: token };
}

export function getAccessToken(user) {
  const token = jwt.sign({ id: user.id }, env.SECRET_JWT, { expiresIn: expiresIn })
  return token;
}

export default requireLogin;