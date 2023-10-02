import { hashPassword } from "../../utils/index.js";
// import { generateJWT } from "../../utils/jwt.js";

const signup = async (
  parent,
  { input: { firstName, lastName, userName, emailAddress, password } },
  { models, req }
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
      // token: generateJWT(saveData),
    };
  } catch (err) {
    console.error(err);
  }
};

const deleteUser = async (parent, { id }, { models, req }) => {
  if (!req.id) {
    throw new Error("You must be signed in");
  }
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
  { models, req }
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

const verifyUser = async (parent, { id }, { models, req }) => {
  if (!req.id) {
    throw new Error("You must be signed in");
  }
  try {
    const updateData = await models.User.findByIdAndUpdate(id, {
      verified: true,
    });

    return updateData;
  } catch (err) {
    console.error(err);
  }
};

export {
  signup,
  deleteUser,
  updateUser,
  verifyUser,
};
