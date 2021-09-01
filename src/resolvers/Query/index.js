module.exports = {
  members: async (parent, args, { models }) => {
    return await models.Member.find();
  },
  member: async (parent, { id }, { models }) => {
    return await models.Member.findById(id);
  },
  pledge: async (parent, args, { models }) => {
    return await models.Pledge.find();
  },
  visitors: async (parent, args, { models }) => {
    return await models.Visitors.find();
  },
  visitor: async (parent, { id }, { models }) => {
    return await models.Visitor.findById(id);
  },
  tithe: async (parent, args, { models }) => {
    return await models.Tithe.find();
  },
};
