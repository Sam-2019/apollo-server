const jwt = require("jsonwebtoken");
const { TOKEN } = require("./config");

const generateAccessToken = (user) => {
  if (!user) return false;
  return jwt.sign({ id: user._id }, TOKEN, {
    expiresIn: "15m",
  });
};

const validateAccessToken = (token) => {
  if (!user) return;
  return jwt.verify(token, TOKEN, {
    expiresIn: "7d",
  });
};

const getUser = (token) => {
  if (token) {
    try {
      // return the user information from the token
      return jwt.verify(token, TOKEN);
    } catch (err) {
      // if there's a problem with the token, throw an error
      throw new Error("Session Invalid");
    }
  }

  return new Error("Invalid Request");
};

module.exports = {
  generateAccessToken,
  validateAccessToken,
  getUser,
};
