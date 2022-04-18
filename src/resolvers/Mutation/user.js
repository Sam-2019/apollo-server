const { hashPassword } = require("../../utils/index");

const signup = async (
  parent,
  { input: { firstName, lastName, userName, emailAddress, password } },
  { models }
) => {
  const hash = hashPassword(password);
  try {
    const saveData = await models.User.create({
      firstName,
      lastName,
      userName,
      emailAddress,
      password: hash,
    });

    return saveData;
  } catch (err) {
    console.error(err);
  }
};

const deleteUser = async (parent, { id }, { models }) => {
  try {
    return await models.User.findByIdAndDelete(id);
  } catch (err) {
    console.error(err);
  }
};

const updateUser = async (
  parent,
  { id, input: { firstName, lastName, userName, emailAddress, password } },
  { models }
) => {
  try {
    const updateData = await models.User.findByIdAndUpdate(
      id,
      {
        $set: {
          firstName,
          lastName,
          userName,
          emailAddress,
          password,
        },
      },
      {
        new: true,
      }
    );
    return updateData;
  } catch (err) {
    console.error(err);
  }
};

const verifyUser = async (parent, { id }, { models }) => {
  try {
    const updateData = await models.User.findByIdAndUpdate(id, {
      verified: true,
    });

    return updateData;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  signup,
  deleteUser,
  updateUser,
  verifyUser,
};
