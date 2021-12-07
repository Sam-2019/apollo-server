const nodemailer = require("nodemailer");
const {
  CLIENT_ID,
  USER_EMAIL,
  CLIENT_SECRET,
  REFRESH_TOKEN,
  USER_NAME,
} = require("../utils/config");
const {
  mailTemplate,
  mailSubject,
} = require("../utils/email_templates/welcome");
const { oAuth2Client } = require("../utils/googleapis");

const sendMail = async ( email, subject, message) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: USER_EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
      jsonTransport: true,
    });

    // transporter.use("compile", hbs(options));

    const mailOptions = {
      from: `${USER_NAME} <${USER_EMAIL}>`,
      to: email,
      subject: subject,
      html: `<body>${message}</body>`,
    };

    const response = transport.sendMail(mailOptions);
    return response;
  } catch (error) {
    return error;
  }
};

const mailer = async (data) => {
  let response = [];

  if (data === undefined) {
    return console.error("No data");
  }

  if (data.length === 0) {
    return console.error("No data");
  }

  for (let member of data) {
    let subject = mailSubject(member[3]);
    let template = mailTemplate(member[0], member[3]);

    const info = await sendMail(
      member.email,
      (member.subject = subject),
      (member.message = template)
    );

    if (info.response.includes("OK")) {
      response.push("Mail sent");
    }
  }

  return response;
};

module.exports = {
  sendMail,
  mailer,
};
