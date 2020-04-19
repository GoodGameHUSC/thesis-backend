import responseCode from '../../config/responseCode';
export default class EventDataJSON {

  data = null;
  message = null;
  success = null;
  errorCode = null;

  static StatusCode = responseCode;

  constructor(success = true, data = {}, message = 'OK', errorCode = responseCode.hardcore.server) {
    this.success = !!success;
    this.message = message;
    this.data = data;
    this.errorCode = errorCode;
  }

  toJSON() {
    if (this.success == true) {
      let res = {
        success: this.success,
        message: this.message
      }
      if (this.data) res = { ...res, data: this.data };
      return res;
    } else {
      let res = {
        success: false,
        errorCode: this.errorCode,
        message: this.message || 'Failed',
      }
      return res;
    }
  }

  static UnAuthEvent = new EventDataJSON(false, null, "Require authentication user's connection", EventDataJSON.StatusCode.auth.un_authorization)

}
