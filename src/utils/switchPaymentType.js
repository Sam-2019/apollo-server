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

module.exports = {
  paymentType,
};
