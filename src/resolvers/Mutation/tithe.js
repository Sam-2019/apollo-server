module.exports = {
  addTithePayer: async (parent, { input: { age, firstName } }, { models }) => {
    try {
      return await models.Tithe.create({
        age,
        firstName,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
