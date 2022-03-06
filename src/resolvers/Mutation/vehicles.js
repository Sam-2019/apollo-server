const addVehicles = async (
  parent,
  { input: { bicycles, cars, sundayService, motors } },
  { models }
) => {
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

const deleteVehicles = async (parent, { id }, { models }) => {
  try {
  } catch (err) {
    console.error(err);
  }
};

const updateVehicles = async (
  parent,
  { id, input: { bicycles, cars, motors } },
  { models }
) => {
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
