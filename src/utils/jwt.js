const { ApolloError } = require("apollo-server-errors");
const { sign, verify } = require("jsonwebtoken");
const { ACCESS_SECRET, REFRESH_SECRET } = require("./config");

const generateAccessToken = (user) => {
  if (!user) return false;
  return sign({ id: String(user._id) }, ACCESS_SECRET, {
    expiresIn: "15min",
  });
};

const generateRefreshToken = (user) => {
  if (!user) return "";
  return sign({ id: String(user._id) }, REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

const validateAccessToken = (token) => {
  if (!token) return;
  return verify(token, ACCESS_SECRET);
};

const validateRefreshToken = (token) => {
  if (!token) return;
  return verify(token, REFRESH_SECRET);
};

const getUser = (token) => {
  if (!token) {
    return;
  }

  try {
    // return the user information from the token
    return validateAccessToken(token);
  } catch (err) {
    // if there's a problem with the token, throw an error
    throw new ApolloError("Session Invalid");
  }
};

function setCookie() {
  const nowDate = Date.now();
  const date = new Date(nowDate);
  const time = new Date(nowDate);
  const extendDate = date.setDate(date.getDate() + 5);
  const extendTime = time.setMinutes(time.getMinutes() + 20);
  // console.log({ extendDate: new Date(extendDate).toUTCString() });
  // console.log({ extendTime: new Date(extendTime).toUTCString() });

  return {
    access: extendTime,
    refresh: extendDate,
  };
}

const sendRefreshToken = (res, user) => {
  res.cookie("refreshToken", generateRefreshToken(user), {
    httpOnly: true,
    path: "/refresh_token",
  });
};

// const sendAccessToken = (res, user) => {
//   res.cookie("access-token", generateRefreshToken(user), {
//     httpOnly: true,
//     path: "/refresh_token",
//   });
// };

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  validateAccessToken,
  validateRefreshToken,
  getUser,
  setCookie,
  sendRefreshToken,
};
