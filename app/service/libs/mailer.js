import env from "../../config/env";
import { info } from "winston";

const nodemailer = require("nodemailer");

class Mailer {

  /**
   * Transport email account 
   */
  static transporter = nodemailer.createTransport({
    host: env.MAIL_HOST,
    port: env.MAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: env.MAIL_USER_ACCOUNT, // generated ethereal user
      pass: env.MAIL_USER_PASSWORD // generated ethereal password
    }
  });

  static async sendMail(from, to, subject, text, html) {

    let info = await this.transporter.sendMail({ from, to, subject, text, html });

    // console.log(nodemailer.getTestMessageUrl(info));
    return info;
  }

}
export default Mailer;