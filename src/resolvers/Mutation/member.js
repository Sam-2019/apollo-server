const { extractMonth, extractYear } = require("../../utils/index");

const addMember = async (
  parent,
  {
    input: {
      firstName,
      lastName,
      otherName,
      dateOfBirth,
      age,
      gender,
      hometown,
      region,
      country,
      residentialAddress,
      contact,
      emergencyContact,
      emailAddress,
      postalAddress,
      maritalStatus,
      spouseName,
      numberOfChlidren,
      nameOfChildren,
      dateJoinedChurch,
      department,
      previousChurch,
    },
  },
  { models }
) => {
  const chapel = extractMonth(dateOfBirth);

  try {
    return await models.Member.create({
      firstName,
      lastName,
      otherName,
      dateOfBirth,
      chapel,
      age,
      gender,
      hometown,
      region,
      country,
      residentialAddress,
      contact,
      emergencyContact,
      emailAddress,
      postalAddress,
      maritalStatus,
      spouseName,
      numberOfChlidren,
      nameOfChildren,
      dateJoinedChurch,
      department,
      previousChurch,
    });
  } catch (err) {
    console.log(err);
  }
};
const deleteMember = async (parent, { id }, { models }) => {
  try {
    return await models.Member.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
};
const updateMember = async (
  parent,
  { id, input: { firstName, age } },
  { models }
) => {
  try {
    return await models.Member.findByIdAndUpdate(
      id,
      {
        $set: { firstName, age },
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
  addMember,
  deleteMember,
  updateMember,
};
