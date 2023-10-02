import { models } from "../../db/models.js";

import {
  url_pattern,
  description_pattern,
  special_characters,
} from "../../utils/index.js";

String.prototype.rm_space = function () {
  return this.replace(/((\s*\S+)*)\s*/, "$1");
};

const addJob = async (info) => {
  const sanitized_description = info.description.replace(
    special_characters,
    ""
  );
  const description = String(sanitized_description.match(description_pattern));
  const url = String(sanitized_description.match(url_pattern));
  try {
    const saveData = await models.Job.create({
      title: info.title,
      description: description.rm_space(),
      domain: info.domain,
      imgURL: info.img,
      favicon: info.favicon,
      url: url,
    });
    if (!saveData) {
      return "Error!";
    }
    return "Data saved!";
  } catch (err) {
    console.error(err);
  }
};

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

export { addJob, deleteJob, updateJob };
