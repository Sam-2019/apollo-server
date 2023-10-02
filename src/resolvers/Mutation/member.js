import { extractMonth, transformNumber } from "../../utils/index.js";
import { imageUploadType } from "../../utils/switchModel.js";
// import { writeRedis } from "../../services/redis.js";
import { SlackAlert } from "../../services/slack.js";
import { telegramAlert } from "../../services/telegram.js";

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
  { models, req }
) => {
  if (!req.id) {
    throw new Error("You must be signed in");
  }
  const chapel = extractMonth(dateOfBirth);
  const validContact = transformNumber(country, contact);
  const validEmergencyContact = transformNumber(country, emergencyContact);

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
      contact: validContact,
      emergencyContact: validEmergencyContact,
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

    if (nameOfChildren.length > 0) {
      await nameOfChildren.forEach((text) => {
        const name = text.split(" ");
        models.Child.create({
          firstName: name ? name[0] : null,
          lastName: name ? name[1] : null,
          memberID: saveData.id,
        });
        telegramAlert(`${name[0]} ${name[1]}`, "Child");
      });
    }

    if (saveData.emailAddress != "") {
      // writeRedis("h3", `${firstName} ${lastName}`, emailAddress);
    }

    SlackAlert(`${firstName} ${lastName}`, chapel, "Member");
    telegramAlert(`${firstName} ${lastName}`, "Member");

    return saveData;
  } catch (err) {
    console.error(err);
  }
};

const deleteMember = async (parent, { id }, { models, req }) => {
  if (!req.id) {
    throw new Error("You must be signed in");
  }
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
  { models, req }
) => {
  if (!req.id) {
    throw new Error("You must be signed in");
  }
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
  { models, req }
) => {
  if (!req.id) {
    throw new Error("You must be signed in");
  }
  let dbModel = imageUploadType(type);

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

export { addMember, deleteMember, updateMember, uploadImage };
