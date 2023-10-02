import { createTransport } from "nodemailer";
import { CLIENT_ID, USER_EMAIL, CLIENT_SECRET, REFRESH_TOKEN, USER_NAME } from "../utils/config.js";
import { mailTemplate, mailSubject } from "../utils/email_templates/welcome.js";
import { oAuth2Client } from "../utils/googleapis.js";

const sendMail = async (email, subject, message) => {
  try {
    let accessToken = await oAuth2Client.getAccessToken();
    const transport = createTransport({
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

    const response = await transport.sendMail(mailOptions);
    return response;
  } catch (err) {
    console.error(err);
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

  try {
    for (let member of data) {
      let subject = mailSubject(member[3]);
      let template = mailTemplate(member[0], member[3]);

      const info = await sendMail(
        member.email,
        (member.subject = subject),
        (member.message = template)
      );
      
      // if (info.response.includes("OK")) {
      //   response.push("Mail sent");
      // }
    }

    if (!response) return console.log("empty response");

    return response;
  } catch (err) {
    console.log(err);
  }
};

export {
  sendMail,
  mailer,
};
