const mongoose = require("mongoose");

const issueSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    labels: [
      {
        type: String,
      },
    ],
  },
  {
    timetamps: true,
  }
);

issueSchema.index({ title: "text", description: "text" });
const Issue = mongoose.model("Issue", issueSchema);
Issue.createIndexes();

module.exports = Issue;
