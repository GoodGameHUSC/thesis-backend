export default class SemanticError {
  code = null;
  message = null;

  constructor(code, message) {
    this.code = code;
    this.message = message;
  }

  isEqual(code) {
    return this.code == code;
  }

  static isEqual(error, code) {
    return error.code == code;
  }

}
