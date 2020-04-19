import responseCode from '../config/responseCode';
const wrapper = {};

wrapper.success = (data = null, message = 'OK', statusCode = 200) => {
  let responseOb = {
    success: true,
    message: message || 'OK',
  }
  if (data) responseOb = { ...responseOb, data: data };
  if (statusCode < 200 || statusCode > 299) statusCode = 200;
  return responseOb
}

wrapper.errors = (message = 'Failed', statusCode = 400, errorType = responseCode.undefined) => {
  let responseOb = {
    success: false,
    errorCode: errorType,
    message: message || 'Failed',
  }
  if (statusCode >= 200 && statusCode <= 299) statusCode = 400;
  return responseOb
}

export default wrapper;