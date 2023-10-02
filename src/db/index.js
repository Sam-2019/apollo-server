import mongoose from "mongoose";
import { DB_URI } from "../utils/config.js";

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: false,
});

const dbConn = mongoose.connection;
export { dbConn };
