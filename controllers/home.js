const Project = require("./../models/Project");

async function getAllProjects(req, res) {
  const projects = await Project.find({});
  return res.render("home", { projects });
}

module.exports = {
  getAllProjects,
};
