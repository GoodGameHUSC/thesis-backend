const qs = require('querystring');
import Axios from "axios";
const APP_ID = 'vN7Q914q';
const APP_CLIENT_ID = 'dj0yJmk9UU1tUzBlRklUeWVNJmQ9WVdrOWRrNDNVVGt4TkhFbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWI0';
const APP_CLIENT_SECRET = '5dd22f379c9c9e28989c149b57e47a53d32acd7b';

export const oauthYahooClient = {
  getAccessToken: (token) => {
    return new Promise(async (res, rej) => {
      try {
        const AUTH_HEADER = Buffer.from(`${APP_CLIENT_ID}:${APP_CLIENT_SECRET}`, `binary`).toString(`base64`);

        let response = await Axios({
          url: `https://api.login.yahoo.com/oauth2/get_token`,
          method: 'post',
          headers: {
            'Authorization': `Basic ${AUTH_HEADER}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36',
          },
          data: qs.stringify({
            client_id: APP_CLIENT_ID,
            client_secret: APP_CLIENT_SECRET,
            redirect_uri: 'oob',
            code: token,
            grant_type: 'authorization_code'
          }),
        }).catch((err) => {
          rej(new Error('Invalid access token'));
        });

        return res({ tokens: response.data });
      } catch (e) {
        return rej(e)
      }
    })


  },
  getUserInforFromToken: (guid_id, accessToken) => {
    return new Promise(async (res, rej) => {
      try {
        let response = await Axios({
          url: `https://social.yahooapis.com/v1/user/${guid_id}/profile?format=json&access_token=${accessToken}`,
          method: 'get',
        }).catch((err) => {
          rej(new Error('Invalid access token'));
        });
        if (response.data.profile.emails.length == 0) rej('Expect Email')

        return res({ email: filterPrimaryEmail(response.data.profile.emails), all: response.data.profile })

      } catch (e) {
        rej(new Error('Get information via yahoo fail'))
      }
    })
  },


}
function filterPrimaryEmail(emailArray) {
  let listEmail = emailArray.filter(element => {
    return element.primary
  })
  return listEmail.length > 0 ? listEmail[0].handle : null;
}