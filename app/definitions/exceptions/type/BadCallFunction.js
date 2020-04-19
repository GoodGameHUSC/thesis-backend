import responseCode from '../../../config/responseCode';
export default class BadCallFunction extends Error {
  message = 'Call function with bad argument';
  code = responseCode.hardcore.server

  constructor(message) {
    super()
    this.message = message;
  }
}
