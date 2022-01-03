const { registration } = require("../../services/slack");
const { sendMessage } = require("../../services/telegram");
const { extractMonth, extractYear } = require("../../utils/index");

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
  { models }
) => {
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

    if (saveData.emailAddress != "") {
      writeRedis("visitor", `${firstName} ${lastName}`, emailAddress);
    }

    registration(`${firstName} ${lastName}`, chapel);
    sendMessage(`${firstName} ${lastName}`, 'Visitor');
  } catch (err) {
    console.error(err);
  }
};
const deleteVisitor = async (parent, { id }, { models }) => {
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
  { models }
) => {
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

module.exports = {
  addVisitor,
  deleteVisitor,
  updateVisitor,
};
