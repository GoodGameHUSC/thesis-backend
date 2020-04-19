import responseCode from '../../../config/responseCode';
export default class ServerError extends Error {
  message = 'Server error';
  code = responseCode.hardcore.server

  constructor(message) {
    super()
    this.message = message;
  }
}