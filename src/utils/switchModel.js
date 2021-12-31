const models = require("../db/models");

const paymentType = async (type) => {
  let model;

  switch (type) {
    case "tithe":
      model = models.Tithe;
      break;

    case "welfare":
      model = models.Welfare;
      break;

    case "project offering":
      model = models.ProjectOffering;
      break;

    case "pvv":
      model = models.Pvv;
      break;

    case "mmv":
      model = models.Mmv;
      break;

    default:
      model = null;
  }

  return await model;
};

const groupType = async (type) => {
  let model;
  let limit = 16;

  switch (type) {
    case "adult":
      model = models.Adult;
      break;

    case "omega":
      model = models.Omega;
      break;

    case "children":
      model = models.Children;
      break;

    case "vehicles":
      model = models.Vehicle;
      limit = 12;
      break;

    case "sundayTotal":
      model = models.SundayTotal;
      break;

    default:
      model = null;
  }

  return {
    model,
    limit,
  };
};

const countryCode = async (country, contact) => {
  let value;
  let splitContact = contact.slice(1);

  switch (country) {
    case "Nigeria":
      value = `+234${splitContact}`;
      break;

    case "United Kingdom":
      value = `+4${splitContact}`;
      break;

    case "United States of America":
      value = `+1${splitContact}`;
      break;

    default:
      value = `+233${splitContact}`;
  }

  return await value;
};

module.exports = {
  paymentType,
  groupType,
  countryCode,
};
