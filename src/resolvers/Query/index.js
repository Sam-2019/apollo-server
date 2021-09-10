const members = async (parent, args, { models }) => {
  return await models.Member.find();
};

const membersFeed = async (parent, { cursor }, { models }) => {
  const limit = 10;
  let hasNextPage = false;
  let cursorQuery = {};

  if (cursor) {
    cursorQuery = { _id: { $lt: cursor } };
  }

  let members = await models.Member.find(cursorQuery)
    .sort({ _id: -1 })
    .limit(limit + 1);

  if (members.length > limit) {
    hasNextPage = true;
    members = members.slice(0, -1);
  }

  const newCursor = members[members.length - 1]._id;

  return {
    members,
    cursor: newCursor,
    hasNextPage,
  };
};

const member = async (parent, { id }, { models }) => {
  return await models.Member.findById(id);
};

const pledge = async (parent, args, { models }) => {
  return await models.Pledge.find();
};

const pledgeFeed = async (parent, args, { models }) => {
  return await models.Pledge.find();
};

const visitors = async (parent, args, { models }) => {
  return await models.Visitor.find();
};

const visitorsFeed = async (parent, args, { models }) => {
  return await models.Visitor.find();
};

const visitor = async (parent, { id }, { models }) => {
  return await models.Visitor.findById(id);
};

const tithe = async (parent, args, { models }) => {
  return await models.Tithe.find();
};

const titheFeed = async (parent, args, { models }) => {
  return await models.Tithe.find();
};

const sundayService = async (parent, args, { models }) => {
  return await models.SundayService.find();
};

const sundayServiceFeed = async (parent, args, { models }) => {
  return await models.SundayService.find();
};

const welfare = async (parent, args, { models }) => {
  return await models.Welfare.find();
};

const welfareFeed = async (parent, args, { models }) => {
  return await models.Welfare.find();
};

const projectOffering = async (parent, args, { models }) => {
  return await models.ProjectOffering.find();
};

const projectOfferingFeed = async (parent, args, { models }) => {
  return await models.ProjectOffering.find();
};

const pvv = async (parent, args, { models }) => {
  return await models.Pvv.find();
};

const pvvFeed = async (parent, args, { models }) => {
  return await models.Pvv.find();
};

const mmv = async (parent, args, { models }) => {
  return await models.Mmv.find();
};

const mmvFeed = async (parent, args, { models }) => {
  return await models.Mmv.find();
};

const chapel = async (parent, { chapel }, { models }) => {
  return await models.Member.find({
    chapel: { $regex: chapel, $options: "i" },
  });
};

const department = async (parent, { department }, { models }) => {
  return await models.Member.find({
    department: { $regex: department, $options: "i" },
  });
};

module.exports = {
  members,
  membersFeed,
  member,
  pledge,
  pledgeFeed,
  visitors,
  visitorsFeed,
  visitor,
  tithe,
  titheFeed,

  welfare,
  welfareFeed,
  projectOffering,
  projectOfferingFeed,
  pvv,
  pvvFeed,
  mmv,
  mmvFeed,

  sundayService,
  sundayServiceFeed,
  chapel,
  department,
};
