const { paymentType } = require("../../utils/switchPaymentType");

console.log(paymentType);

const addPaymentPayer = async (
  parent,
  { input: { member, month, type } },
  { models }
) => {
  let dbModel = await paymentType(type);
  // console.log(member);
  // console.log(dbModel, "new");
  //console.log(type);

  try {
    return await member.forEach((text) => {
      dbModel.create({
        memberID: text,
        month,
      });
    });
  } catch (err) {
    console.log(err);
  }
};
const deletePaymentPayer = async (parent, { id, type }, { models }) => {
  let dbModel = await paymentType(type);

  try {
    return await dbModel.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
};
const updatePaymentPayer = async (
  parent,
  { id, type, input: { member } },
  { models }
) => {
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
    console.log(err);
  }
};

module.exports = {
  addPaymentPayer,
  deletePaymentPayer,
  updatePaymentPayer,
};
