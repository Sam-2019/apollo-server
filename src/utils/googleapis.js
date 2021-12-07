const { google } = require("googleapis");
const {
  CLIENT_ID,
  REDIRECT_URI,
  CLIENT_SECRET,
  REFRESH_TOKEN,
} = require("../utils/config");

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

module.exports = {
  oAuth2Client,
};
