module.exports = {
  members: async (parent, args, { models }) => {
    return await models.Note.find();
  },
  member: async (parent, args, { models }) => {
    return await models.Note.findById(args.id);
  },
};
