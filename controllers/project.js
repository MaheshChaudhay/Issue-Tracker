const Issue = require("../models/Issue");
const Project = require("./../models/Project");

function addProject(req, res) {
  return res.render("create_project");
}

async function getUserProjects(req, res) {
  const user = res.locals.user;
  const projects = await Project.find({ user: user._id });
  return res.render("user_projects", { projects });
}

async function getProject(req, res) {
  let issues = [];
  let filtered = false;
  if (req.query.filters) {
    issues = JSON.parse(req.query.filters);
    for (const issue of issues) {
      for (const label of issue.labels) {
        console.log(label);
      }
    }
  }
  let project = await Project.findById(req.params.id).populate("issues");
  const projectLabels = [];
  const projectAuthors = [];
  for (const issue of project.issues) {
    projectAuthors.push(issue.author);
    for (const label of issue.labels) {
      projectLabels.push(label);
    }
  }

  const labels = new Set(projectLabels);
  const authors = new Set(projectAuthors);
  if (req.query.filters) {
    project = {
      ...project._doc,
      issues: issues,
    };
    filtered = true;
  }
  return res.render("project_detail", {
    project,
    labels,
    authors,
    filtered,
  });
}

async function createProject(req, res) {
  const newProject = await Project.create({
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    user: res.locals.user,
  });
  if (newProject) {
    return res.redirect("/");
  } else {
    return res.status(500).send("Internal Server Error..");
  }
}

async function applyLabelFilters(req, res) {
  const projectId = req.params.id;
  let authors = req.body.authors;
  let labels = req.body.labels;
  const project = await Project.findById(projectId).populate("issues");
  let projectIssues = [];

  if (labels) {
    if (typeof labels == "string") {
      labels = [labels];
    }
    if (authors) {
      if (typeof authors == "string") {
        authors = [authors];
      }
      projectIssues = await Issue.find({
        labels: {
          $in: labels,
        },
        author: {
          $in: authors,
        },
        project: projectId,
      });
    } else {
      projectIssues = await Issue.find({
        labels: {
          $in: labels,
        },
        project: projectId,
      });
    }
  }

  let projectLabels = [];
  let projectAuthors = [];
  for (const issue of project.issues) {
    projectAuthors.push(issue.author);
    for (const label of issue.labels) {
      projectLabels.push(label);
    }
  }
  projectLabels = new Set(projectLabels);
  projectAuthors = new Set(projectAuthors);

  const filterData = JSON.stringify(projectIssues);
  const pathname = `/projects/project-detail/${project._id}?filters=${filterData}`;
  return res.redirect(pathname);
}

module.exports = {
  addProject,
  createProject,
  getProject,
  applyLabelFilters,
  getUserProjects,
};
