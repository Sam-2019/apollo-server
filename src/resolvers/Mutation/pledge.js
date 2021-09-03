const addPledge = async (parent, { input: { age, firstName } }, { models }) => {
  try {
    return await models.Member.create({
      age,
      firstName,
    });
  } catch (err) {
    console.log(err);
  }
};
const deletePledge = async (parent, { id }, { models }) => {
  try {
    return await models.Pledge.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
};
const updatePledge = async (
  parent,
  { id, input: { pledgeID } },
  { models }
) => {
  try {
    return await models.Pledge.findByIdAndUpdate(
      id,
      {
        $set: { pledgeID },
      },
      {
        new: true,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addPledge,
  deletePledge,
  updatePledge,
};
