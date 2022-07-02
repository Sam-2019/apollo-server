const { paymentType } = require("../../utils/switchModel");

const addPaymentPayer = async (
  parent,
  { input: { members, month, type } },
  { models, user }
) => {
  if (!user) {
    throw new Error("You must be signed in");
  }
  let dbModel = await paymentType(type);

  try {
    const data = await members.forEach((text) => {
      dbModel.create({
        memberID: text,
        month,
      });
    });
    if (!data) {
      return "Error";
    }

    if (data.memberID && type === "tithe") {
      //take memberID
      //find member firstName, lastName and email
      //save details in redis
      //send payment alert after sunday
    }

    return "Success";
  } catch (err) {
    console.error(err);
  }
};

const deletePaymentPayer = async (parent, { id, type }, { models, user }) => {
  if (!user) {
    throw new Error("You must be signed in");
  }
  let dbModel = await paymentType(type);

  try {
    return await dbModel.findByIdAndDelete(id);
  } catch (err) {
    console.error(err);
  }
};

const updatePaymentPayer = async (
  parent,
  { id, type, input: { member } },
  { models, user }
) => {
  if (!user) {
    throw new Error("You must be signed in");
  }
  let dbModel = await paymentType(type);
  try {
    return await dbModel.findByIdAndUpdate(
      id,
      {
        $set: { member },
      },
      {
        new: true,
      }
    );
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  addPaymentPayer,
  deletePaymentPayer,
  updatePaymentPayer,
};
