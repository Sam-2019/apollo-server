const { sign, verify } = require("jsonwebtoken");
const { TOKEN } = require("./config");

const generateAccessToken = (user) => {
  if (!user) return false;
  return sign({ id: user._id }, TOKEN, {
    expiresIn: "15m",
  });
};

const generaterefreshToken = (user) => {
  if (!user) return false;
  return sign({ id: user._id }, TOKEN, {
    expiresIn: "7d",
  });
};

const validateAccessToken = (token, next) => {
  if (!token) return next();

  try {
    return verify(token, TOKEN, {
      expiresIn: "7d",
    });
  } catch {
    throw new Error("Invalid access token");
  }
};

const validateRefreshToken = (token, next) => {
  if (!token) return next();
  try {
    return verify(token, TOKEN, {
      expiresIn: "7d",
    });
  } catch {
    throw new Error("Invalid refresh token");
  }
};

const getUser = (token, next) => {
  if (!token) {
    return next();
  }

  try {
    // return the user information from the token
    return validateAccessToken(token, next);
  } catch (err) {
    // if there's a problem with the token, throw an error
    throw new Error("Session Invalid");
  }
};

module.exports = {
  generateAccessToken,
  generaterefreshToken,
  getUser,
};
