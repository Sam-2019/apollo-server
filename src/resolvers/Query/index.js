const { UserInputError } = require("apollo-server");
const { paymentType } = require("../../utils/switchModel");
const { comparePassword } = require("../../utils/index");
const {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
} = require("../../utils/jwt");

const users = async (parent, args, { models, user }) => {
  return models.User.find();
};

const usersFeed = async (parent, { cursor }, { models, user }) => {
  const limit = 10;
  let hasNextPage = false;
  let cursorQuery = {};

  if (cursor) {
    cursorQuery = { _id: { $lt: cursor } };
  }

  let users = await models.User.find(cursorQuery)
    .sort({ _id: -1 })
    .limit(limit + 1);

  if (users.length > limit) {
    hasNextPage = true;
    users = users.slice(0, -1);
  }

  const newCursor = users[users.length - 1]._id;

  return {
    users,
    cursor: newCursor,
    hasNextPage,
  };
};

const user = async (parent, args, { models, req }) => {
  if (!req.id) return;
  return await models.User.findById(req.id);
};

const login = async (
  parent,
  { emailAddress, password, username },
  { models, user, req, res }
) => {
  try {
    const user = await models.User.findOne({ emailAddress });
    if (!user) {
      throw new UserInputError("Invalid Email or Password");
    }

    const valid = await comparePassword(password, user.password);
    if (!valid) {
      throw new UserInputError("Invalid Email or Password");
    }

    // sendRefreshToken(res, user);
    return {
      accessToken: generateAccessToken(user),
      refreshToken: generateRefreshToken(user),
    };
    // const data = await models.User.findOne({ userName });
    // if (!data) {
    //   return new Error("Invalid Username");
    // }
    // const usernamePassword = await comparePassword(password, data.password);
    // if (!usernamePassword) {
    //   return new Error("Password is incorrect");
    // }
    // return data;
  } catch (err) {
    throw new Error(err);
  }
};

const logout = async (parent, {}, { models, req, res }) => {
  try {
    sendRefreshToken(res, "");
    return {
      accessToken: "",
      refreshToken: "",
    };
  } catch (err) {
    throw new Error(err);
  }
};

const members = async (parent, args, { models, req }) => {
  if (!req.id) return;
  return await models.Member.find();
};

const membersFeed = async (parent, { cursor }, { models, req }) => {
  if (!req.id) return;
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

const member = async (parent, { id }, { models, req }) => {
  if (!req.id) return;
  return await models.Member.findById(id);
};

const memberByName = async (
  parent,
  { firstName, lastName },
  { models, req }
) => {
  if (!req.id) return;
  return await models.Member.findOne({ firstName, lastName });
};

const pledge = async (parent, { id }, { models, req }) => {
  if (!req.id) return;
  return await models.Pledge.findById(id);
};

const pledges = async (parent, args, { models, req }) => {
  if (!req.id) return;
  return await models.Pledge.find();
};

const pledgeFeed = async (parent, args, { models, req }) => {
  if (!req.id) return;
  return await models.Pledge.find();
};

const visitors = async (parent, args, { models, req }) => {
  if (!req.id) return;
  return await models.Visitor.find();
};

const visitorsFollowup = async (parent, args, { models, req }) => {
  if (!req.id) return;

  const nowDate = Date.now();
  // const currentDay = new Date("August 16, 2022 23:15:30");
  const currentDay = new Date(nowDate);
  const getDay = currentDay.getUTCDay();
  const formatCurrentDay = currentDay.toISOString().slice(0, 10);

  const getSunday = currentDay.setDate(currentDay.getDate() - 2);
  const formatGetSunday = new Date(getSunday).toISOString().slice(0, 10);

  // const output = await models.Visitor.find({
  //   createdAt: { $gte: formatGetSunday, $lte: formatCurrentDay },
  // });
  // console.log({ output });

  if (getDay === 2) {
    const data = await models.Visitor.find({
      createdAt: { $gte: formatGetSunday, $lte: formatCurrentDay },
    });
    console.log({ data });
    return data;
  }

  return;
};

const visitorsFeed = async (parent, args, { models, req }) => {
  if (!req.id) return;
  return await models.Visitor.find();
};

const visitor = async (parent, { id }, { models, req }) => {
  if (!req.id) return;
  return await models.Visitor.findById(id);
};

const tithe = async (parent, args, { models, req }) => {
  if (!req.id) return;
  return await models.Tithe.find();
};

const titheFeed = async (parent, args, { models, req }) => {
  if (!req.id) return;
  return await models.Tithe.find();
};

const sundayService = async (parent, args, { models, req }) => {
  if (!req.id) return;
  return await models.SundayService.find();
};

const sundayServiceFeed = async (parent, args, { models, req }) => {
  if (!req.id) return;
  return await models.SundayService.find();
};

const welfare = async (parent, args, { models, req }) => {
  if (!req.id) return;
  return await models.Welfare.find();
};

const welfareFeed = async (parent, args, { models, req }) => {
  if (!req.id) return;
  return await models.Welfare.find();
};

const projectOffering = async (parent, args, { models, req }) => {
  if (!req.id) return;
  return await models.ProjectOffering.find();
};

const projectOfferingFeed = async (parent, args, { models, req }) => {
  if (!req.id) return;
  return await models.ProjectOffering.find();
};

const pvv = async (parent, args, { models, req }) => {
  if (!req.id) return;
  return await models.Pvv.find();
};

const pvvFeed = async (parent, args, { models, req }) => {
  if (!req.id) return;
  return await models.Pvv.find();
};

const mmv = async (parent, args, { models, req }) => {
  if (!req.id) return;
  return await models.Mmv.find();
};

const mmvFeed = async (parent, args, { models, req }) => {
  if (!req.id) return;
  return await models.Mmv.find();
};

const chapel = async (parent, { chapel }, { models, req }) => {
  if (!req.id) return;
  return await models.Member.find({
    chapel: { $regex: chapel, $options: "i" },
  });
};

const groupImage = async (parent, { type, group }, { models, req }) => {
  if (!req.id) return;
  if (type === "departments") {
    return await models.Member.find({
      department: { $regex: group, $options: "i" },
    });
  }

  return await models.Member.find({
    chapel: { $regex: group, $options: "i" },
  });
};

const department = async (parent, { department }, { models, req }) => {
  if (!req.id) return;
  return await models.Member.find({
    department: { $regex: department, $options: "i" },
  });
};

const payment = async (parent, { month, type }, { models, req }) => {
  if (!req.id) return;
  let dbModel = paymentType(type);

  try {
    let list = [];
    // const data = await dbModel.find({ month });
    // console.log(data);

    await dbModel.find({ month }).then((results) => {
      for (let result of results) {
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

const countGender = async (parent, { group }, { models, req }) => {
  if (!req.id) return;
  let genderData = [];

  if (group != "") {
    const maleGroup = await models.Member.where("gender", "Male")
      .where("group", group)
      .count();

    const femaleGroup = await models.Member.where("gender", "Female")
      .where("group", group)
      .count();

    genderData.push(
      {
        type: "Male",
        value: maleGroup,
      },
      {
        type: "Female",
        value: femaleGroup,
      }
    );

    return genderData;
  }

  const male = await models.Member.find({
    gender: "Male",
  }).count();

  const female = await models.Member.find({
    gender: "Female",
  }).count();

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

const groupStat = async (parent, { type }, { models, req }) => {
  if (!req.id) return;
  let adult = [];
  let omega = [];
  let children = [];

  try {
    const results = await models.SundayService.find().limit(8).sort("-date");

    for (let result of results) {
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

// const sundayStat = async (parent, { type }, { models, req }) => {
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

const sundayStat = async (parent, { type, vehicles }, { models, req }) => {
  if (!req.id) return;
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

    for (let result of results) {
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

const vehicles = async (parent, { id }, { models, req }) => {
  if (!req.id) return;
  return await models.Vehicle.find();
};

const jobs = async (parent, args, { models, req }) => {
  // if (!req.id) return;
  return models.Job.find();
};

const jobsFeed = async (parent, { cursor }, { models, req }) => {
  if (!req.id) return;
  const limit = 10;
  let hasNextPage = false;
  let cursorQuery = {};

  if (cursor) {
    cursorQuery = { _id: { $lt: cursor } };
  }

  let jobs = await models.Job.find(cursorQuery)
    .sort({ _id: -1 })
    .limit(limit + 1);

  if (jobs.length > limit) {
    hasNextPage = true;
    jobs = jobs.slice(0, -1);
  }

  const newCursor = jobs[jobs.length - 1]._id;

  return {
    jobs,
    cursor: newCursor,
    hasNextPage,
  };
};

const job = async (parent, { id }, { models, req }) => {
  if (!req.id) return;
  return await models.Job.findById(id);
};

module.exports = {
  members,
  membersFeed,
  member,
  memberByName,
  pledges,
  pledge,
  pledgeFeed,
  visitors,
  visitorsFeed,
  visitorsFollowup,
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

  groupImage,

  payment,
  countGender,

  groupStat,
  sundayStat,

  users,
  usersFeed,
  user,
  login,
  logout,

  jobs,
  jobsFeed,
  job,
};
