const models = require("../db/models");

const paymentType = async (type) => {
  let model;

  switch (type) {
    case "Tithe":
      model = models.Tithe;
      break;

    case "Welfare":
      model = models.Welfare;
      break;

    case "ProjectOffering":
      model = models.ProjectOffering;
      break;

    case "Pvv":
      model = models.Pvv;
      break;

    case "Mmv":
      model = models.Mvv;
      break;

    default:
      model = null;
  }

  return await model;
};

module.exports = {
  paymentType,
};
