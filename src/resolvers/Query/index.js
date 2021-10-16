const { paymentType } = require("../../utils/switchModel");

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
  let dbModel = await paymentType(type);

  try {
    let list = [];
    // const data = await dbModel.find({ month });
    // console.log(data);

    await dbModel.find({ month }).then((results) => {
      for (result of results) {
        const memberIDS = String(result.memberID);
        list.push(memberIDS);
      }
    });

    return list.map(async (element) => {
      return await models.Member.findById(element).then((data) => {
        return {
          ...data,
          id: data.id,
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

    // const data = await dbModel.find({ month }).then((results) =>
    //   results.forEach((element) => {
    //     return models.Member.findById(element.id);
    //   })
    // );

    // .populate("member", { path: "firstName", select: "_id" });

    // const reviews = await models.Member.find({
    //   _id: data._id,
    // });

    // async function getName() {
    //   const name = await models.Member.find({
    //     _id: result._id,
    //   });

    // }

    // getName();
    // return await dbModel.find({
    //   month: { $regex: month, $options: "i" },
    // });
  } catch (err) {
    console.error(err);
  }
};

const countGender = async (parent, { group }, { models }) => {
  if (group != "") {
    const groupData = await models.Member.aggregate([
      {
        $match: {
          group,
        },
      },
      {
        $group: {
          _id: "$gender",
          count: { $sum: 1 },
        },
      },
    ]);

    return groupData;
  }

  const gender = await models.Member.aggregate([
    {
      $group: {
        _id: "$gender",
        count: { $sum: 1 },
      },
    },
  ]);

  return gender;
};

const groupStat = async (parent, { type }, { models }) => {
  let adult = [];
  let omega = [];
  let children = [];

  try {
    const results = await models.SundayService.find().limit(8).sort("-date");

    for (result of results) {
      const adultMaleData = {
        sundayService: result.id,
        date: result.date,
        type: result.type,
        group: "Male",
        value: result.adultMale,
      };

      const adultFemaleData = {
        sundayService: result.id,
        date: result.date,
        type: result.type,
        group: "Female",
        value: result.adultFemale,
      };
      adult.push(adultMaleData, adultFemaleData);

      const omegaMaleData = {
        sundayService: result.id,
        date: result.date,
        type: result.type,
        group: "Male",
        value: result.omegaMale,
      };

      const omegaFemaleData = {
        sundayService: result.id,
        date: result.date,
        type: result.type,
        group: "Female",
        value: result.omegaFemale,
      };
      omega.push(omegaMaleData, omegaFemaleData);

      const childrenMaleData = {
        sundayService: result.id,
        date: result.date,
        type: result.type,
        group: "Male",
        value: result.childrenBoy,
      };

      const childrenFemaleData = {
        sundayService: result.id,
        date: result.date,
        type: result.type,
        group: "Female",
        value: result.childrenGirl,
      };
      children.push(childrenMaleData, childrenFemaleData);
    }

    if (type === "omega") {
      return omega;
    }

    if (type === "children") {
      return children;
    }

    return adult;
  } catch (err) {
    console.error(err);
  }
};

// const sundayStat = async (parent, { type }, { models }) => {
//   let adult = [];
//   let omega = [];
//   let children = [];

//   let cars = [];
//   let motors = [];
//   let bicycles = [];

//   try {
//     const results = await models.SundayService.find().limit(8).sort("-date");

//     for (result of results) {
//       const adultData = {
//         sundayService: result.id,
//         date: result.date,
//         type: result.type,
//         group: "Adult",
//         value: result.adultMale + result.adultFemale,
//       };

//       const omegaData = {
//         sundayService: result.id,
//         date: result.date,
//         type: result.type,
//         group: "Omega",
//         value: result.omegaMale + result.omegaFemale,
//       };

//       const childrenData = {
//         sundayService: result.id,
//         date: result.date,
//         type: result.type,
//         group: "Children",
//         value: result.childrenBoy + result.childrenGirl,
//       };

//       const carData = {
//         sundayService: result.id,
//         date: result.date,
//         type: result.type,
//         group: "Cars",
//         value: result.cars,
//       };

//       const motorData = {
//         sundayService: result.id,
//         date: result.date,
//         type: result.type,
//         group: "Motors",
//         value: result.motors,
//       };

//       const bicycleData = {
//         sundayService: result.id,
//         date: result.date,
//         type: result.type,
//         group: "Bicyles",
//         value: result.bicycles,
//       };

//       adult.push(adultData);
//       omega.push(omegaData);
//       children.push(childrenData);

//       cars.push(carData);
//       motors.push(motorData);
//       bicycles.push(bicycleData);
//     }

//     if (type === "vehicles") {
//       return cars.concat(motors, bicycles);
//     }

//     return adult.concat(omega, children);
//   } catch (err) {
//     console.error(err);
//   }
// };

// get stats for service type
// first service
// second service
// joint service

//vehicles

const sundayStat = async (parent, { type, vehicles }, { models }) => {
  let adult = [];
  let omega = [];
  let children = [];

  let cars = [];
  let motors = [];
  let bicycles = [];

  try {
    const results = await models.SundayService.find({ type })
      .limit(8)
      .sort("-date");

    for (result of results) {
      const adultData = {
        sundayService: result.id,
        date: result.date,
        type: result.type,
        group: "Adult",
        value: result.adultMale + result.adultFemale,
      };

      const omegaData = {
        sundayService: result.id,
        date: result.date,
        type: result.type,
        group: "Omega",
        value: result.omegaMale + result.omegaFemale,
      };

      const childrenData = {
        sundayService: result.id,
        date: result.date,
        type: result.type,
        group: "Children",
        value: result.childrenBoy + result.childrenGirl,
      };

      const carData = {
        sundayService: result.id,
        date: result.date,
        type: result.type,
        group: "Cars",
        value: result.cars,
      };

      const motorData = {
        sundayService: result.id,
        date: result.date,
        type: result.type,
        group: "Motors",
        value: result.motors,
      };

      const bicycleData = {
        sundayService: result.id,
        date: result.date,
        type: result.type,
        group: "Bicyles",
        value: result.bicycles,
      };

      adult.push(adultData);
      omega.push(omegaData);
      children.push(childrenData);

      cars.push(carData);
      motors.push(motorData);
      bicycles.push(bicycleData);
    }

    if (vehicles === true) {
      return cars.concat(motors, bicycles);
    }

    return adult.concat(omega, children);
  } catch (err) {
    console.error(err);
  }
};

const vehicles = async (parent, { id }, { models }) => {
  return await models.Vehicle.find();
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
  vehicles,

  payment,
  countGender,

  groupStat,
  sundayStat,
};
