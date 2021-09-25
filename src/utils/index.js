// export const extractMonth = (value) => {
//   const extractChapel = value;
//   const chapel = extractChapel.substring(5, 7);

//   return chapel;
// };

const sumData = (male, female) => {
  const data = male + female;

  // console.log(data);

  return data;
};

const extractMonth = (date) => {
  const month = new Date(date);
  return month.toLocaleString(this.locale, { month: "long" });
};

const extractYear = (date) => {
  const year = new Date(date);
  return year.toLocaleString(this.locale, { year: "numeric" });
};

module.exports = {
  extractMonth,
  extractYear,
  sumData,
};
