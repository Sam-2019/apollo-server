const addChild = async (
  parent,
  { input: { age, firstName } },
  { models, req }
) => {
  if (!req.id) {
    throw new Error("You must be signed in");
  }
  try {
    return await models.Child.create({
      // firstName,
      // lastName,
    });
  } catch (err) {
    console.error(err);
  }
};

const deleteChild = async (parent, { id }, { models, req }) => {
  if (!req.id) {
    throw new Error("You must be signed in");
  }
  try {
    return await models.Child.findByIdAndDelete(id);
  } catch (err) {
    console.error(err);
  }
};

const updateChild = async (
  parent,
  { id, input: { firstName, lastName } },
  { models, req }
) => {
  if (!req.id) {
    throw new Error("You must be signed in");
  }
  try {
    return await models.Child.findByIdAndUpdate(
      id,
      {
        $set: { firstName, lastName },
      },
      {
        new: true,
      }
    );
  } catch (err) {
    console.error(err);
  }
};

export { addChild, deleteChild, updateChild }
