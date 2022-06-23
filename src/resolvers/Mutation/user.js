const { hashPassword } = require("../../utils/index");
const { generateJWT } = require("../../utils/jwt");

const signup = async (
  parent,
  { input: { firstName, lastName, userName, emailAddress, password } },
  { models }
) => {
  const hash = hashPassword(password);
  const trimEmail = emailAddress.trim().toLowerCase();
  try {
    const saveData = await models.User.create({
      firstName,
      lastName,
      userName,
      emailAddress: trimEmail,
      password: hash,
    });

    return {
      token: generateJWT(saveData),
    };
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
  {
    id,
    input: {
      firstName,
      lastName,
      userName,
      gender,
      contact,
      emailAddress,
      homeAddress,
      password,
      dob,
    },
  },
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
          gender,
          contact,
          emailAddress,
          homeAddress,
          password,
          dob,
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
