import { SlackAlert } from "../../services/slack.js";
import { telegramAlert } from "../../services/telegram.js";
import { extractMonth, extractYear } from "../../utils/index.js";

const addVisitor = async (
  parent,
  {
    input: {
      ageGroup,
      awarenessChannel,
      awarenessChannelOther,
      contact,
      date,
      firstName,
      invitedBy,
      knowingChrist,
      lastName,
      location,
      membership,
      monthOfBirth,
    },
  },
  { models, req }
) => {
  if (!req.id) {
    throw new Error("You must be signed in");
  }
  const chapel = extractMonth(monthOfBirth);

  try {
    const saveData = await models.Visitor.create({
      ageGroup,
      awarenessChannel,
      awarenessChannelOther,
      contact,
      date,
      firstName,
      invitedBy,
      knowingChrist,
      lastName,
      location,
      membership,
      monthOfBirth,
      chapel,
    });

    SlackAlert(`${firstName} ${lastName}`, chapel);
    telegramAlert(`${firstName} ${lastName}`, "Visitor");

    return saveData;
  } catch (err) {
    console.error(err);
  }
};

const deleteVisitor = async (parent, { id }, { models, req }) => {
  if (!req.id) {
    throw new Error("You must be signed in");
  }
  try {
    return await models.Visitor.findByIdAndDelete(id);
  } catch (err) {
    console.error(err);
  }
};

const updateVisitor = async (
  parent,
  {
    id,
    input: {
      ageGroup,
      awarenessChannel,
      awarenessChannelOther,
      contact,
      date,
      firstName,
      invitedBy,
      knowingChrist,
      lastName,
      location,
      membership,
      monthOfBirth,
    },
  },
  { models, req }
) => {
  if (!req.id) {
    throw new Error("You must be signed in");
  }
  try {
    return await models.Visitor.findByIdAndUpdate(
      id,
      {
        $set: {
          ageGroup,
          awarenessChannel,
          awarenessChannelOther,
          contact,
          date,
          firstName,
          invitedBy,
          knowingChrist,
          lastName,
          location,
          membership,
          monthOfBirth,
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

export { addVisitor, deleteVisitor, updateVisitor };
