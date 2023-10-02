// import linkPreviewGenerator from "link-preview-generator";
import {addJob} from "../resolvers/Mutation/job.js";
import { TWITTER_LINK } from "../utils/constants.js";

const checkTwiter = async (info) => {
  return await addJob(info);
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

  // const info = await linkPreviewGenerator(data);
  // if (info.domain.includes(TWITTER_LINK)) {
  //   return checkTwiter(info);
  // }

  return "Unsupported website";
};

export {
  jobTransformer,
};
