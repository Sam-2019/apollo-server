const { MEMBER_REGISTRATION, VISITOR_REGISTRATION } = require("./constants");

const member = (name) =>
  `<h1>Hello ${name}</h1>
  <p>Welcome to Elim Temple</p>`;

const visitor = (name) =>
  `<h1>Hello ${name}</h1>
  <p>Welcome to Elim Temple</p>`;

const mailTemplate = async (name, type) => {
  let template;

  switch (type) {
    case "member":
      template = member(name);
      break;

    case "visitor":
      template = visitor(name);
      break;

    default:
      template = null;
  }

  return template;
};

const mailSubject = async (type) => {
  let subject;

  switch (type) {
    case "member":
      subject = MEMBER_REGISTRATION;
      break;

    case "visitor":
      subject = VISITOR_REGISTRATION;
      break;

    default:
      subject = null;
  }

  return subject;
};

module.exports = {
  mailTemplate,
  mailSubject,
};
