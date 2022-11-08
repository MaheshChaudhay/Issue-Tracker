const express = require("express");
const db = require("./config/mongoose");
const cookieParser = require("cookie-parser");

const app = express();
const port = 8000;

app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// setup the ejs engine
app.set("view engine", "ejs");
app.set("views", "views");

// setup the router
app.use("/", require("./routes/index"));

app.listen(port, function (err) {
  if (err) {
    console.log("error in running the server : ", err);
    return;
  }
  console.log("server is listening on port : ", port);
});
