const addPledge = async (
  parent,
  {
    input: {
      firstName,
      lastName,
      otherName,
      contact,
      emailAddress,
      pledgeDate,
      programme,
      redeemedDate,
      amount,
    },
  },
  { models, user }
) => {
  if (!user) {
    throw new Error("You must be signed in");
  }
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

const deletePledge = async (parent, { id }, { models, user }) => {
  if (!user) {
    throw new Error("You must be signed in");
  }
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
      firstName,
      lastName,
      otherName,
      contact,
      emailAddress,
      programme,
      amount,
    },
  },
  { models, user }
) => {
  if (!user) {
    throw new Error("You must be signed in");
  }
  try {
    return await models.Pledge.findByIdAndUpdate(
      id,
      {
        $set: {
          firstName,
          lastName,
          otherName,
          contact,
          emailAddress,
          programme,
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

const updatePledgeStatus = async (
  parent,
  { id, input: { status } },
  { models, user }
) => {
  if (!user) {
    throw new Error("You must be signed in");
  }
  try {
    return await models.Pledge.findByIdAndUpdate(
      id,
      {
        $set: {
          status,
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
  updatePledgeStatus,
};
