const Project = require("./../models/Project");
const Issue = require("./../models/Issue");

async function getCreateIssue(req, res) {
  const projectId = req.params.id;
  const project = await Project.findById(projectId).populate("issues");
  const issueLabels = [];
  for (const issue of project.issues) {
    for (const label of issue.labels) {
      issueLabels.push(label);
    }
  }
  const labels = new Set(issueLabels);
  return res.render("create_issue", { projectId, labels });
}

async function createIssue(req, res) {
  const issue = JSON.parse(Object.keys(req.body)[0]);
  const labels = [];
  for (const label of issue.labels) {
    labels.push(label.trim());
  }
  for (let j = 0; j < labels.length; j++) {
    const words = labels[j].split(" ");
    for (let i = 0; i < words.length; i++) {
      if (words[i].length)
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    labels[j] = words.join(" ");
  }
  const project = await Project.findById(issue.projectId);
  const newIssue = await Issue.create({
    author: issue.author,
    description: issue.description,
    project: project._id,
    labels: labels,
    title: issue.title,
    status: "Open",
  });
  if (newIssue) {
    project.issues.push(newIssue._id);
    project.openedIssues = project.openedIssues + 1;
    project.save();
  }
  return res.status(200).json({
    message: "Issue created successfully",
    data: {
      issue: req.body,
    },
  });
}

async function deleteIssue(req, res) {
  const issue = await Issue.findById(req.params.id);
  const project = await Project.findById(issue.project);
  project.issues.remove(issue._id);
  if (issue.status == "Open") project.openedIssues = project.openedIssues - 1;
  else project.closedIssues = project.closedIssues - 1;
  project.save();
  await issue.remove();
  return res.status(200).redirect("back");
}

async function toggleIssue(req, res) {
  let close = false;
  const issue = await Issue.findById(req.params.id);
  const project = await Project.findById(issue.project);
  if (issue.status == "Open") {
    close = true;
    issue.status = "Closed";
    project.closedIssues++;
    project.openedIssues--;
  } else {
    issue.status = "Open";
    project.openedIssues++;
    project.closedIssues--;
  }
  project.save();
  issue.save();
  return res.status(200).redirect("back");
}

async function searchIssue(req, res) {
  const projectId = req.params.projectId;
  const issues = await Issue.find({
    $text: { $search: req.body.search },
    project: projectId,
  });
  const filterData = JSON.stringify(issues);
  const pathname = `/projects/project-detail/${projectId}?filters=${filterData}`;
  return res.redirect(pathname);
}

module.exports = {
  createIssue,
  getCreateIssue,
  deleteIssue,
  toggleIssue,
  searchIssue,
};
