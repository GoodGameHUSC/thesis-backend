import keys from '../config/env/keys';
const clientTwilio = require('twilio')(keys.twilioSID, keys.twilioToken);

export function sendSMSService(body, to, notReject = false) {
  return new Promise(async (res, rej) => {
    try {
      const response = await clientTwilio.messages.create({
        body: body || "",
        from: keys.twilioPhoneNumber,
        to: to,
      });
      res({ phone: to, success: true })
    } catch (e) {
      if (notReject) {
        res({ phone: to, success: false, error: e.message || 'Twillio was declined phone that number' })
      }
      rej(e)
    }
  })

}

export default clientTwilio;
