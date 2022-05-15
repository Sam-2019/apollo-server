const { extractMonth } = require("../../utils/index");
const { transformNumber, imageUploadType } = require("../../utils/switchModel");
const { writeRedis } = require("../../services/redis");
const { registration } = require("../../services/slack");
const { sendMessage } = require("../../services/telegram");

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
  const newContact = transformNumber(country, contact);
  const newEmergencyContact = transformNumber(country, emergencyContact);

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
      contact: newContact,
      emergencyContact: newEmergencyContact,
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
      writeRedis("h3", `${firstName} ${lastName}`, emailAddress);
    }

    registration(`${firstName} ${lastName}`, chapel, "Member");
    sendMessage(`${firstName} ${lastName}`, "Member");

    return saveData;
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
    const updateData = await models.Member.findByIdAndUpdate(
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
    return updateData;
  } catch (err) {
    console.error(err);
  }
};

const uploadImage = async (
  parent,
  { id, input: { imageURL, type } },
  { models }
) => {
  let dbModel = await imageUploadType(type);
  try {
    return await dbModel.findByIdAndUpdate(
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
