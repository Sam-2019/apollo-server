const models = require("../db/models");

const paymentType = (type) => {

    console.log(type)
    ///
  let model;


  switch (type) {
    case "tithe":
      model = models.Tithe;
      break;

    case "welfare":
      model = models.Welfare;
      break;

    case "projectOffering":
      model = models.ProjectOffering;
      break;

    case "pvv":
      model = models.Pvv;
      break;

    case "mmv":
      model = models.Mvv;
      break;

    default:
      model = null;
  }

  return model;
};

module.exports = {
  paymentType,
};
