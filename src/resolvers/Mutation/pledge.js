const addPledge = async (
  parent,
  {
    input: {
      pledgeDate,
      firstName,
      lastName,
      otherName,
      contact,
      emailAddress,
      programme,
      redeemedDate,
      amount,
    },
  },
  { models }
) => {
  
  //check if name exists
  //create new member
  //get member id for pledge entry

  try {
    return await models.Pledge.create({
      pledgeDate,
      programme,
      redeemedDate,
      amount,
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
