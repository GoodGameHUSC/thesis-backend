import { io } from '../../../main';
import responseCode from '../../config/responseCode.js';

const injector = async (req, res, next) => {
  /**
 * 
 * @param {string} message
 * @param {object} data
 * @param {int} statusCode 
 */
  res.success = (data = null, message = 'OK', statusCode = 200) => {
    let responseOb = {
      success: true,
      message: message || 'OK',
    }
    if (data) responseOb = { ...responseOb, data: data };
    if (statusCode < 200 || statusCode > 299) statusCode = 200;
    return res.status(statusCode).json(responseOb)
  }

  res.errors = (message = 'Failed', statusCode = 400, errorType = responseCode.undefined) => {
    let responseOb = {
      success: false,
      errorCode: errorType,
      message: message || 'Failed',
    }
    if (statusCode >= 200 && statusCode <= 299) statusCode = 400;
    return res.status(statusCode).json(responseOb)
  }

  res.io = io;
  next()
}
export default injector;