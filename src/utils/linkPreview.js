const { Job } = require("../db/models");
const linkPreviewGenerator = require("link-preview-generator");
const { TWITTER_LINK } = require("../utils/constants");
const {
  url_pattern,
  description_pattern,
  special_characters,
} = require("../utils/index");

String.prototype.rm_space = function () {
  return this.replace(/((\s*\S+)*)\s*/, "$1");
};

const checkTwiter = async (info) => {
  const sanitized_description = info.description.replace(
    special_characters,
    ""
  );
  const description = String(sanitized_description.match(description_pattern));
  const url = String(sanitized_description.match(url_pattern));

  try {
    const saveData = await Job.create({
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

// const trial = () => {
//   const source = {
//     title: "Vacancies in Ghana on Twitter",
//     description: "“Female Marketing Assistant - https://t.co/eUTRrZVD90”",
//     domain: "twitter.com",
//     img: "https://pbs.twimg.com/profile_images/1231236382808563713/Q88JDBjw_400x400.jpg",
//     favicon: "https://twitter.com/favicon.ico",
//   };

//   const sanitized_description = source.description.replace(
//     special_characters,
//     ""
//   );
//   const description = String(sanitized_description.match(description_pattern));
//   console.log(description);
// };

// trial();

const jobTransformer = async (data) => {
  if (!data) return;

  const info = await linkPreviewGenerator(data);
  if (info.domain.includes(TWITTER_LINK)) {
    return checkTwiter(info);
  }

  return "Unsupported website";
};

module.exports = {
  jobTransformer,
};
