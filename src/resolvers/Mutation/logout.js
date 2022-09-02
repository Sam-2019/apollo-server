const { sendRefreshToken } = require("../../utils/jwt");

const logout = async (parent, args, { models, req, res }) => {
  //   if (!req.id) {
  //     return false;
  //   }
  //   try {
  //     const user = await models.User.findById(req.id);
  //     if (!user) {
  //       return false;
  //     }

  //     res.clearCookie("jid");
  //     req.id = null;
  //     console.log({ req: req.id });
  //     return true;
  //   } catch (err) {
  //     console.log(err);
  //   }

  sendRefreshToken(res, "");
  return {
    accessToken: "",
    refreshToken: "",
  };
};

module.exports = {
  logout,
};
