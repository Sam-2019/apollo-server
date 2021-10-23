const { extractMonth, extractYear } = require("../../utils/index");
const { writeRedis } = require("../../utils/redis");

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
      group,
    },
  },
  { models }
) => {
  const chapel = extractMonth(dateOfBirth);

  try {
    const saveData = await models.Member.create({
      firstName,
      lastName,
      otherName,
      imageURL: null,
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
      group,
    });

    if (saveData.emailAddress != "") {
      writeRedis(`${firstName} ${lastName}`, emailAddress);
    }

  } catch (err) {
    console.error(err);
  }
};

const deleteMember = async (parent, { id }, { models }) => {
  try {
    return await models.Member.findByIdAndDelete(id);
  } catch (err) {
    console.error(err);
  }
};

const updateMember = async (
  parent,
  {
    id,
    input: {
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
      group,
    },
  },
  { models }
) => {
  try {
    return await models.Member.findByIdAndUpdate(
      id,
      {
        $set: {
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
          group,
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

const uploadImage = async (parent, { input: { id, imageURL } }, { models }) => {
  try {
    return await models.Member.findByIdAndUpdate(
      id,
      {
        $set: { imageURL },
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
  addMember,
  deleteMember,
  updateMember,
  uploadImage,
};
