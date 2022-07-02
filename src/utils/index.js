const linkPreviewGenerator = require("link-preview-generator");
const countries = require("i18n-iso-countries");
const PhoneNumber = require("awesome-phonenumber");
const bcrypt = require("bcryptjs");
const { Job } = require("../db/models");
const saltRounds = 12;

const url_pattern =
  /[A-Za-z]+:\/\/[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_:%&;\?\#\/.=]+/g;
const description_pattern = /^.*?(?=-)/gm;
const special_characters = /['“”\\\\]/gm;

String.prototype.rm_space = function () {
  return this.replace(/((\s*\S+)*)\s*/, "$1");
};

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

const checkTwiter = async (data) => {
  // console.log({ TwitterLink: data });

  const info = await linkPreviewGenerator(data);

  if (!info) {
    return;
  }

  const sanitized_description = info.description.replace(
    special_characters,
    ""
  );
  const description = String(sanitized_description.match(description_pattern));

  const url = String(sanitized_description.match(url_pattern));

  try {
    const saveData = await Job.create({
      title: info.title,
      description: description.rm_space(),
      domain: info.domain,
      imgURL: info.img,
      favicon: info.favicon,
      url: url,
    });

    if (!saveData) {
      return "Error!";
    }

    return "Data saved!";
  } catch (err) {
    console.error(err);
  }
};

// const trial = () => {
//   const source = {
//     title: "Vacancies in Ghana on Twitter",
//     description: "“Female Marketing Assistant - https://t.co/eUTRrZVD90”",
//     domain: "twitter.com",
//     img: "https://pbs.twimg.com/profile_images/1231236382808563713/Q88JDBjw_400x400.jpg",
//     favicon: "https://twitter.com/favicon.ico",
//   };

//   const sanitized_description = source.description.replace(
//     special_characters,
//     ""
//   );
//   const description = String(sanitized_description.match(description_pattern));
//   console.log(description);
// };

// trial();

module.exports = {
  extractMonth,
  extractYear,
  sumData,
  hashPassword,
  comparePassword,
  // isEmail,
  transformNumber,
  checkTwiter,
};
