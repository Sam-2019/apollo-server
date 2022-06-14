const countries = require("i18n-iso-countries");
const PhoneNumber = require("awesome-phonenumber");
const bcrypt = require("bcryptjs");
const saltRounds = 12;

// const validate = require("deep-email-validator");
// export const extractMonth = (value) => {
//   const extractChapel = value;
//   const chapel = extractChapel.substring(5, 7);

//   return chapel;
// };

const sumData = (male, female) => {
  const data = male + female;

  return data;
};

const extractMonth = (date) => {
  const month = new Date(date);
  return month.toLocaleString(this.locale, { month: "long" });
};

const extractYear = (date) => {
  const year = new Date(date);
  return year.toLocaleString(this.locale, { year: "numeric" });
};

const hashPassword = (password) => {
  const result = bcrypt.hashSync(password, saltRounds);
  return result;
};

const comparePassword = (password, userPassword) => {
  const result = bcrypt.compare(password, userPassword);
  return result;
};

// const isEmail = (email) => {
//   const result = validate(email);
//   console.log(result)
//   return result;
// };

const transformNumber = (country, contact) => {
  let getData = countries.getAlpha2Code(country, "en");
  let pn = new PhoneNumber(contact, `${getData}`);

  return pn.getNumber();
};

module.exports = {
  extractMonth,
  extractYear,
  sumData,
  hashPassword,
  comparePassword,
  // isEmail,
  transformNumber,
};
