import responseCode from '../../../config/responseCode';
export default class AuthorizationError extends Error {
  message = 'Require a right permission';
  code = responseCode.auth.un_authorization

  constructor(message) {
    super()
    this.message = message;
  }
}