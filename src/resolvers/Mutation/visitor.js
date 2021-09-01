module.exports = {
  addVisitor: async (parent, { input: { age, firstName } }, { models }) => {
    try {
      return await models.Visitor.create({
        age,
        firstName,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
