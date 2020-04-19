import responseCode from '../../../config/responseCode';
export default class UndefinedError extends Error {
  message = 'Undefined error';
  code = responseCode.undefined

  constructor(message) {
    super()
    this.message = message;
  }
}