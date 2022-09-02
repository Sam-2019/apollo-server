const { validateAccessToken } = require("./jwt");

const isAuth = (req, res, next) => {
  const authorization = req.headers["authorization"];

  if (!authorization) {
    // throw new AuthenticationError("not authenticated");
    return next();
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = validateAccessToken(token);
    req.id = payload.id;
  } catch {}

  return next();
};

module.exports = {
  isAuth,
};
