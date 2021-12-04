const path = require("path");
const Bree = require("bree");
// optional
const ms = require("ms");
const dayjs = require("dayjs");
const Graceful = require("@ladjs/graceful");
const Cabin = require("cabin");

const bree = new Bree({
  logger: new Cabin(),

  //
  jobs: [
    // runs `./jobs/welcomeEmail.js` at 10am every Tuesday
    {
      name: "welcomeEmail",
      path: path.join(__dirname, "jobs", "welcomeEmail.js"),
      cron: "0 10 * * * 2",
    },
  ],
});

const graceful = new Graceful({ brees: [bree] });
graceful.listen();

bree.start();
