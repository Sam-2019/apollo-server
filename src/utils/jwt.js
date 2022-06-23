const jwt = require("jsonwebtoken");
const { TOKEN } = require("./config");

// generate a JWT that stores a user id
const generateJWT = async (user) => {
  return await jwt.sign({ id: user._id }, TOKEN);
};

// validate the JWT
const validateJWT = async (token) => {
  return await jwt.verify(token, TOKEN);
};

const getUser = (token) => {
  if (token) {
    try {
      // return the user information from the token
      return jwt.verify(token, TOKEN);
    } catch (err) {
      // if there's a problem with the token, throw an error
      throw new Error("Session invalid");
    }
  }
};

module.exports = {
  generateJWT,
  validateJWT,
  getUser,
};
