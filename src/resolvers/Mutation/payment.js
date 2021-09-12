const { paymentType } = require("../../utils/switchPaymentType");

const addPaymentPayer = async (
  parent,
  { input: { members, month, type } },
  { models }
) => {
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
    return "Success";
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
