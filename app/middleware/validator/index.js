import responseCode from '../../config/responseCode';
import { validationResult } from 'express-validator/check';

const response_message = {
  user_does_exist: "Customer with email doesn't exist",
  bad_params: "Bad parameter"
}

const validate = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    return res.errors(errors.errors[0].msg || response_message.bad_params, 400, responseCode.params.invalid);
  };
};

export default validate;