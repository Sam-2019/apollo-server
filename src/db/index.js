const mongoose = require("mongoose");

const DB_NAME = process.env.DB_NAME;
const mongoURI = `mongodb://localhost:27017/${DB_NAME}`;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: false,
});

var dbConn = mongoose.connection;
dbConn.on("connected", function () {
  console.log("Mongoose connected");
});
