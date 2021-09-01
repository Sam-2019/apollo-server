module.exports = {
  addSundayService: async (parent, { input: { age, firstName } }, { models }) => {
      try {
        return await models.Member.create({
          age,
          firstName,
        });
      } catch (err) {
        console.log(err);
      }
    },
  };
  