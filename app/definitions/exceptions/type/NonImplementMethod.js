import responseCode from '../../../config/responseCode';
export default class NonImplementMethod extends Error {
  message = 'Try to call a method was not implemented yet';
  code = responseCode.hardcore.server
  constructor(message) {
    super()
    this.message = message;
  }
}