const express = require("express");
const projectController = require("./../controllers/project");
const { checkAuthentication, checkUser } = require("./../utils");

const router = express.Router();

router.get("/add-project", checkAuthentication, projectController.addProject);
router.post("/add-project", checkUser, projectController.createProject);
router.get("/project-detail/:id", projectController.getProject);
router.post("/label-author-filters/:id", projectController.applyLabelFilters);

router.get(
  "/user-projects",
  checkAuthentication,
  checkUser,
  projectController.getUserProjects
);
module.exports = router;
