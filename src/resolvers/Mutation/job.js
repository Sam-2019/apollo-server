const deleteJob = async (parent, { id }, { models }) => {
  try {
    return await models.Job.findByIdAndDelete(id);
  } catch (err) {
    console.error(err);
  }
};

const updateJob = async (
  parent,
  { id, input: { title, description, domain, imgURL, favicon, url } },
  { models, user }
) => {
  if (!user) {
    throw new Error("You must be signed in");
  }
  try {
    const updateData = await models.Job.findByIdAndUpdate(
      id,
      {
        $set: {
          title,
          description,
          domain,
          imgURL,
          favicon,
          url,
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

module.exports = {
  deleteJob,
  updateJob,
};
