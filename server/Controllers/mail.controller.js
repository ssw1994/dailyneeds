const nodeMailer = require("nodemailer");
const { ERRORS, APP } = require("../Constants/app.constant");

exports.transporter = nodeMailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
  secure: true,
});

exports.registraionTemplate = (username) => {
  `<html>
        <head>
        <style></style>
        </head>
        <title>${APP.NAME}</title>
        <body>
            <div>Hello ${username},</div>
            <br/><br/><br/>
            <div class="box">
                <p><a href="${process.env.FRONT_END_APP_URL}/verifyEmail?username=${username}">Link</a><p>
            </div>
        </body>
    </html>`;
};
