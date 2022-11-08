const express = require("express");
const homeController = require("./../controllers/home");
const { checkUser } = require("./../utils");
const router = express.Router();

router.use("/projects", require("./project"));
router.use("/issues", require("./issues"));
router.use("/users", require("./auth"));
router.use("/", checkUser, homeController.getAllProjects);

module.exports = router;
