const { google } = require("googleapis");
const nodemailer = require("nodemailer");
const {
  CLIENT_ID,
  REDIRECT_URI,
  USER_EMAIL,
  CLIENT_SECRET,
  REFRESH_TOKEN,
  USER_NAME,
} = require("./config");

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendMail = async (name, email) => {
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
      subject: "Membership",
      text: `Hello ${name}`,
      html: `<h1>Hello ${name}</h1>
      <p>Welcome to Elim Temple</p>`,
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

  for (member of data) {
    const info = await sendMail(member.name, member.email);

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
