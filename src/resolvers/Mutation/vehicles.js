const addVehicles = async (
  parent,
  { input: { bicycles, cars, sundayService, motors } },
  { models, req }
) => {
  if (!req.id) {
    throw new Error("You must be signed in");
  }
  console.log(bicycles, motors, cars, sundayService);
  try {
    return await models.Vehicle.create({
      sundayService,
      bicycles,
      cars,
      motors,
    });
  } catch (err) {
    console.error(err);
  }
};

const deleteVehicles = async (parent, { id }, { models, req }) => {
  if (!req.id) {
    throw new Error("You must be signed in");
  }
  try {
  } catch (err) {
    console.error(err);
  }
};

const updateVehicles = async (
  parent,
  { id, input: { bicycles, cars, motors } },
  { models, req }
) => {
  if (!req.id) {
    throw new Error("You must be signed in");
  }
  try {
    return await models.Vehicles.findByIdAndUpdate(
      id,
      {
        $set: { bicycles, cars, motors },
      },
      {
        new: true,
      }
    );
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  addVehicles,
  deleteVehicles,
  updateVehicles,
};
