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
    limit
  };
};

module.exports = {
  paymentType,
  groupType,
};
