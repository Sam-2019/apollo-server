const { sumData } = require("../../utils/index");

const addSundayService = async (
  parent,
  {
    input: {
      adultFemale,
      adultMale,
      altercallFemale,
      altercallMen,
      bibleText,
      bicycles,
      cars,
      childrenBoy,
      childrenGirl,
      date,
      endTime,
      motors,
      omegaFemale,
      omegaMale,
      preacher,
      startTime,
      theme,
      visitorsFemale,
      type,
    },
  },
  { models }
) => {
  // const groupTotal = [
  //   { key: "Adult", value: sumData(adultMale, adultFemale) },
  //   { key: "Omega", value: sumData(omegaMale, omegaFemale) },
  //   { key: "Children", value: sumData(childrenBoy, childrenGirl) },
  // ];

  // const vehicleArray = [
  //   { key: "Cars", value: cars },
  //   { key: "Motors", value: motors },
  //   { key: "Bicycles", value: bicycles },
  // ];

  // const adultArray = [
  //   { key: "Male", value: adultMale },
  //   { key: "Female", value: adultFemale },
  // ];

  // const omegaArray = [
  //   { key: "Male", value: omegaMale },
  //   { key: "Female", value: omegaFemale },
  // ];

  // const childrenArray = [
  //   { key: "Male", value: childrenBoy },
  //   { key: "Female", value: childrenGirl },
  // ];
  try {
    return await models.SundayService.create({
      adultFemale,
      adultMale,
      altercallFemale,
      altercallMen,
      bibleText,
      bicycles,
      cars,
      childrenBoy,
      childrenGirl,
      date,
      endTime,
      motors,
      omegaFemale,
      omegaMale,
      preacher,
      startTime,
      theme,
      visitorsFemale,
      type,
    });

    // vehicleArray.forEach(async (text) => {
    //   await models.Vehicle.create({
    //     sundayService: sundayServiceData.id,
    //     group: text.key,
    //     date,
    //     value: text.value,
    //   });
    // });

    // adultArray.forEach(async (text) => {
    //   await models.Adult.create({
    //     sundayService: sundayServiceData.id,
    //     group: text.key,
    //     date,
    //     value: text.value,
    //   });
    // });

    // omegaArray.forEach(async (text) => {
    //   await models.Omega.create({
    //     sundayService: sundayServiceData.id,
    //     group: text.key,
    //     date,
    //     value: text.value,
    //   });
    // });

    // childrenArray.forEach(async (text) => {
    //   await models.Children.create({
    //     sundayService: sundayServiceData.id,
    //     group: text.key,
    //     date,
    //     value: text.value,
    //   });
    // });

    // groupTotal.forEach(async (text) => {
    //   await models.SundayTotal.create({
    //     sundayService: sundayServiceData.id,
    //     group: text.key,
    //     date,
    //     value: text.value,
    //   });
    // });
  } catch (err) {
    console.log(err);
  }
};

const deleteSundayService = async (parent, { id }, { models }) => {
  try {
    return await models.SundayService.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
};

const updateSundayService = async (
  parent,
  { id, input: { preacher } },
  { models }
) => {
  try {
    return await models.SundayService.findByIdAndUpdate(
      id,
      {
        $set: { preacher },
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
  addSundayService,
  deleteSundayService,
  updateSundayService,
};
