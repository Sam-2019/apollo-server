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
      firstName,
      lastName,
      otherName,
      contact,
      emailAddress,
      pledgeDate,
      programme,
      redeemedDate,
      amount,
    });
  } catch (err) {
    console.error(err);
  }
};
const deletePledge = async (parent, { id }, { models }) => {
  try {
    return await models.Pledge.findByIdAndDelete(id);
  } catch (err) {
    console.error(err);
  }
};
const updatePledge = async (
  parent,
  {
    id,
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
  try {
    return await models.Pledge.findByIdAndUpdate(
      id,
      {
        $set: {
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
      {
        new: true,
      }
    );
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  addPledge,
  deletePledge,
  updatePledge,
};
