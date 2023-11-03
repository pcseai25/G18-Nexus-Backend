const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    branch: {
      type: String,
      enum: ["CSE(AI)", "CSE(AIML)"],
    },
    email: { type: String, required: true },
    libId: { type: String, required: true },
    bio: { type: String },
    codechefId: { type: String },
    hackerrankId: { type: String },
    leetcodeId: { type: String },
    githubId: { type: String },
    password: { type: String, required: true },
    enrolledContests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contest",
      },
    ]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
