module.exports = {
    addMember: async (parent, args, { models }) => {
      return await models.Note.create({
        content: args.content,
        author: 'Adam Scott'
      });
    }
  }