import responseCode from '../../config/responseCode';
import logger from '../../utils/logger.js';


const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  logger.info(err);
  if (res.errors) {
    res.errors(err.message, 500)
  } else res.json({
    success: false,
    error: responseCode.hardcore.server,
    message: err.message
  })
};

export default errorHandler;