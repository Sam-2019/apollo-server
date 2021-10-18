const { google } = require("googleapis");
const nodemailer = require("nodemailer");
const {
  CLIENT_ID,
  REDIRECT_URI,
  USER_EMAIL,
  CLIENT_SECRET,
  REFRESH_TOKEN,
} = require("./config");

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendMail = async ({ email }) => {
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
    });

    const mailOptions = {
      from: `${USER_NAME} <${USER_EMAIL}>`,
      to: email,
      subject: "Hello gmail using API",
      text: "Hello gmail using API",
      html: "<h1>Hello gmail using API</h1>",
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {
  sendMail,
};
