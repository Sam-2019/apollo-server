const jwt = require("jsonwebtoken");
const { TOKEN } = require("./config");

const generateAccessToken = async (user) => {
  if (!user) return false;
  return await jwt.sign({ id: user._id }, TOKEN);
};

const validateAccessToken = async (token) => {
  if (!user) return;
  return await jwt.verify(token, TOKEN);
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
