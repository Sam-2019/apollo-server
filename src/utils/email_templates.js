const { USER_EMAIL, USER_NAME } = require("./config");

export const member = {
  from: `${USER_NAME} <${USER_EMAIL}>`,
  to: email,
  subject: "Membership",
  text: `Hello ${name}`,
  html: `<h1>Hello ${name}</h1>
    <p>Welcome to Elim Temple</p>`,
};

export const visitor = {
  from: `${USER_NAME} <${USER_EMAIL}>`,
  to: email,
  subject: "Membership",
  text: `Hello ${name}`,
  html: `<h1>Hello ${name}</h1>
    <p>Welcome to Elim Temple</p>`,
};

export const reminder = {
  from: `${USER_NAME} <${USER_EMAIL}>`,
  to: email,
  subject: "Membership",
  text: `Hello ${name}`,
  html: `<h1>Hello ${name}</h1>
    <p>Welcome to Elim Temple</p>`,
};
