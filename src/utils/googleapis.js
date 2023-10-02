import { google } from "googleapis";
import { CLIENT_ID, REDIRECT_URI, CLIENT_SECRET, REFRESH_TOKEN } from "../utils/config.js";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export {
  oAuth2Client,
};
