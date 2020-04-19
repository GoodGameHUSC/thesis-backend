
const admin = require('firebase-admin');
export default class FCM {

  /**
   * Send a message to a single device
   * @param {*} registrationToken 
   * @param {*} title 
   * @param {*} body 
   * @param {*} sound 
   * @returns {Promise}
   */
  static sendMessage(registrationToken, title, body, sound = "default") {
    return new Promise((res, rej) => {
      admin.messaging().send({
        token: registrationToken,
        notification: {
          title,
          body,
          sound
        },
      }).then((response) => {
        res(response);
      })
        .catch((error) => {
          rej(error);
        });
    });

  }


  /**
   * Send data to a single device
   * @param {*} registrationToken 
   * @param {*} data 
   * @returns {Promise}
   */
  static sendData(registrationToken, data) {
    return new Promise((resolve, reject) => {
      admin.messaging().send({
        token: registrationToken,
        data
      }).then((response) => {
        // Response is a message ID string.
        resolve(response);
      })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Send a message to multiple device
   * @param {*} listRegistrationToken 
   * @param {*} title 
   * @param {*} body 
   * @param {*} sound 
   * @returns {Promise}
   */
  static sendMessageMultipleDevice(listRegistrationToken, title, body, sound = "default") {
    const message = {
      notification: {
        title,
        body,
        sound
      },
      tokens: listRegistrationToken,
    }
    return new Promise((resolve, reject) => {
      admin.messaging().sendMulticast(message)
        .then((response) => {
          if (response.failureCount > 0) {

            const failedTokens = [];
            response.responses.forEach((resp, idx) => {
              if (!resp.success) {
                failedTokens.push(registrationTokens[idx]);
              }
            });
            console.log('List of tokens that caused failures: ' + failedTokens);
            resolve(response.responses);
          }
        });
    })
  }
}