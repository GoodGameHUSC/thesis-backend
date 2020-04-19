const nodemailer = require('nodemailer');
const aws = require('aws-sdk');

// configure AWS SDK
// TODO: change to new project

aws.config.loadFromPath('config/aws_config.json');

// create Nodemailer SES transporter
const mailTransporter = nodemailer.createTransport({
  SES: new aws.SES({
    apiVersion: '2010-12-01',
  }),
});

export function sendEmailText(to, subject, text) {
  return new Promise(async (res, rej) => {
    try {
      const response = await mailTransporter.sendMail({
        from: 'invitation@staging-cloud9.com',
        to: to,
        subject: subject,
        text: text,
      });
      debugger;
      res(response)
    } catch (e) {
      if(e.code == 'MessageRejected'){
        // in sandbox env, so pass this error
        res(true);
      }
      rej(e)
    }
  })
}

export default mailTransporter;
