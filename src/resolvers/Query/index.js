const { paymentType } = require("../../utils/switchPaymentType");

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

const memberByName = async (parent, { firstName, lastName }, { models }) => {
  return await models.Member.find({ firstName, lastName });
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

const payment = async (parent, { month, type }, { models }) => {
  //console.log(month);
  let dbModel = await paymentType(type);

  try {
    let list = [];

    await dbModel.find({ month }).then((results) => {
      for (result of results) {
        const memberIDS = String(result.memberID);
        list.push(memberIDS);
      }
    });

    // console.log(list);

    return list.map(async (element) => {
      return await models.Member.findById(element).then((data) => {
        return {
          ...data._docs,
          id: data._id,
          firstName: data.firstName,
          lastName: data.lastName,
          chapel: data.chapel,
          contact: data.contact,
        };
      });
    });

    // const house = list.map(async (element) => {
    //   return await models.Member.findById(element).then((result) => {
    //     return {
    //       ...result._docs,
    //       firstName: result.firstName,
    //     };
    //   });
    // });

    // console.log(house);
    // const data = await dbModel.find({ month }).then((results) =>
    //   results.forEach((element) => {
    //     return models.Member.findById(element.id);
    //   })
    // );

    // .populate("member", { path: "firstName", select: "_id" });

    // const reviews = await models.Member.find({
    //   _id: data._id,
    // });

    // console.log(reviews);

    // async function getName() {
    //   const name = await models.Member.find({
    //     _id: result._id,
    //   });

    //   console.log(name);
    // }

    // getName();
    // return await dbModel.find({
    //   month: { $regex: month, $options: "i" },
    // });
  } catch (err) {
    console.log(err);
  }
};

const countGender = async (parent, args, { models }) => {
  let genderData = [];
  const male = await models.Member.find({
    gender: "Male",
  }).estimatedDocumentCount();

  const female = await models.Member.find({
    gender: "Female",
  }).estimatedDocumentCount();

  genderData.push(
    {
      type: "Male",
      value: male,
    },
    {
      type: "Female",
      value: female,
    }
  );

  return genderData;
};

const countVehicle = async (parent, args, { models }) => {
  try {
    return await models.Vehicle.find();
  } catch (err) {
    console.log(err);
  }

  // return VehiclesData;
};

module.exports = {
  members,
  membersFeed,
  member,
  memberByName,
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

  payment,
  countGender,
  countVehicle,
};
