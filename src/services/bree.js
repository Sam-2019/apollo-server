const path = require("path");
const Bree = require("bree");
const Graceful = require("@ladjs/graceful");
// const Cabin = require("cabin");

const bree = new Bree({
  logger: new Cabin(),
  root: false,
  jobs: [
    // runs `jobs/welcomeEmail.js` at every minute past hour 2
    {
      name: "welcomeEmail",
      path: path.resolve("src", "jobs", "welcomeEmail.js"),
      cron: "* * * * *",
    },
  ],
});

const graceful = new Graceful({ brees: [bree] });

export { bree, graceful };

// https://www.geeksforgeeks.org/how-to-run-cron-jobs-in-node-js/
