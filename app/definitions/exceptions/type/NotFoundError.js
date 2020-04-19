import responseCode from '../../../config/responseCode';
export default class NotFoundError extends Error {
  message = 'Instance not found error';
  code = responseCode.results.notFound

  constructor(message) {
    super()
    this.message = message;
  }
}