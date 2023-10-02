import countries from "i18n-iso-countries";
import PhoneNumber from "awesome-phonenumber";
import bcrypt from "bcryptjs";
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

const url_pattern =
  /[A-Za-z]+:\/\/[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_:%&;\?\#\/.=]+/g;
const description_pattern = /^.*?(?=-)/gm;
const special_characters = /['“”\\\\]/gm;

export {
  extractMonth,
  extractYear,
  sumData,
  hashPassword,
  comparePassword,
  // isEmail,
  transformNumber,
  url_pattern,
  description_pattern,
  special_characters,
};
