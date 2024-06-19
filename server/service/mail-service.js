const nodemailer = require("nodemailer");
class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVER_HOST,
      port: process.env.SMTP_SERVER_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  async sendActivationMain(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Active your account",
      text:'',
      html: `
        <h1>For activating your account click on link below</h1>
        <a href="${link}">Activation link</a>
        `,
    });
  }
}

module.exports = new MailService();
