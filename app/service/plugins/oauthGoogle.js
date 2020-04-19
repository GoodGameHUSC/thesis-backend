import keys from '../../config/env/keys';
import { requester } from "./axios";

const { google } = require('googleapis');
const oauthGoogleClient = new google.auth.OAuth2(
  keys.googleClientId,
  keys.googleSecretKey,
  keys.googleRedirectURL
);


export function getGoogleUserInformationFromAccessToken(accessToken) {
  return new Promise(async (res, rej) => {
    const url = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
    try {
      const response = await requester.get(url);
      if (response.error) rej(response.error.status);
      res(response.data)
    } catch (e) {
      rej(e)
    }
  })
}

export default oauthGoogleClient;