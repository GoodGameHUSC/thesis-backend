import listAPIKeyHashed from '../../../config/client_api_key_sample';
import responseCode from '../../../config/responseCode';
import logger from '../../../utils/logger';
import { Hashing } from '../../service/libs/authentication';
const fieldName = 'x-api-key';
const rbac_api = async (req, res, next) => {
  const app_key = req.headers[fieldName];

  if (!app_key) return res.errors("Your client need an api key to continue", 500, responseCode.auth.missing_api_key)
  const client_name = app_key.split(".")[0];
  const password = app_key.split(".")[1];

  if (listAPIKeyHashed.hasOwnProperty(client_name) === -1) {
    // reject 
    return res.errors("Your client need an api key to continue", 500, responseCode.auth.missing_api_key)
  } else {

    if (await Hashing.check(password, listAPIKeyHashed[client_name].password)) {
      logger.info("HTTP Request :", {
        client: listAPIKeyHashed[client_name].client,
        device: req.headers['user-agent'],
        time: Date.now(),
        origin: req.headers.host,
        url: req.url
      });
      req.role = listAPIKeyHashed[client_name].role || 'client';
      next();
    } else return res.errors("Your api key wrong! ", 500, responseCode.auth.missing_api_key)
  }

};

export default rbac_api;