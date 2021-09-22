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
  const vehicleArray = [
    { key: "Cars", value: cars },
    { key: "Motors", value: motors },
    { key: "Bicycles", value: bicycles },
  ];
  try {
    const sundayServiceData = await models.SundayService.create({
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

    vehicleArray.forEach(async (text) => {
      await models.Vehicle.create({
        sundayService: sundayServiceData.id,
        type: text.key,
        date,
        number: text.value,
      });
    });
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
