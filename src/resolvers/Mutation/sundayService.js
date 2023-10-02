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
  { models, req }
) => {
  if (!req.id) {
    throw new Error("You must be signed in");
  }
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
  } catch (err) {
    console.error(err);
  }
};

const deleteSundayService = async (parent, { id }, { models, req }) => {
  if (!req.id) {
    throw new Error("You must be signed in");
  }
  try {
    return await models.SundayService.findByIdAndDelete(id);
  } catch (err) {
    console.error(err);
  }
};

const updateSundayService = async (
  parent,
  { id, input: { preacher } },
  { models, req }
) => {
  if (!req.id) {
    throw new Error("You must be signed in");
  }
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
    console.error(err);
  }
};

export { addSundayService, deleteSundayService, updateSundayService };
