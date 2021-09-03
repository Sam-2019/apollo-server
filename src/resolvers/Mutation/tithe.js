
 const addTithePayer= async (parent, { input: { member, month } }, { models }) => {


    try {
      return await member.forEach((text) => {
        models.Tithe.create({
          memberID: text,
          month,
        });
      });
    } catch (err) {
      console.log(err);
    }
  },
  const deleteTithePayer= async (parent, { id }, { models }) => {
    try {
      return await models.Tithe.findByIdAndDelete(id);
    } catch (err) {
      console.log(err);
    }
  },
  const updateTithePayer= async (parent, { id, input: { member } }, { models }) => {
    try {
      return await models.Tithe.findByIdAndUpdate(
        id,
        {
          $set: { member },
        },
        {
          new: true,
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  module.exports = {
addTithePayer,
deleteTithePayer,
updateTithePayer
};
