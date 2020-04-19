import responseCode from '../../../config/responseCode';
export default class BadParameter extends Error {
  message = 'Bad parameter';
  code = responseCode.params.invalid

  constructor(message) {
    super()
    this.message = message;
  }
}
