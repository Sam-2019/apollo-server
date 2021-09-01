const mongoose = require("mongoose");
const mongoURI = `mongodb://localhost:27017/elim-app`;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  autoIndex: false,
  useFindAndModify: false,
});

var dbConn = mongoose.connection;
dbConn.on("connected", function () {
  console.log("Mongoose connected");
});
