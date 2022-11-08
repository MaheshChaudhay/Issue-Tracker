const express = require("express");
const issueController = require("./../controllers/issues");

const router = express.Router();

router.get("/create-issue/:id", issueController.getCreateIssue);
router.post("/create-issue", issueController.createIssue);
router.get("/delete-issue/:id", issueController.deleteIssue);
router.get("/toggle-issue/:id", issueController.toggleIssue);
router.post("/search-issue/:projectId", issueController.searchIssue);

module.exports = router;
