const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/issue_tracker_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connection to database is successfull..");
});

module.exports = db;
