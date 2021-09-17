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
    return await models.Visitor.create({
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
  } catch (err) {
    console.log(err);
  }
};
const deleteVisitor = async (parent, { id }, { models }) => {
  try {
    return await models.Visitor.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
};
const updateVisitor = async (
  parent,
  { id, input: { firstName } },
  { models }
) => {
  console.log(id);
  try {
    return await models.Visitor.findByIdAndUpdate(
      id,
      {
        $set: { firstName },
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
  addVisitor,
  deleteVisitor,
  updateVisitor,
};
