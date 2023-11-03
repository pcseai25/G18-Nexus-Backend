const mongoose = require("mongoose");

const codechefSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    contest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contest",
    },
    isEnrolled: { type: Boolean, required: true, default: false },
    success: { type: Boolean },
    profile: { type: String },
    currentRating: { type: Number },
    afterRating: { type: Number },
    highestRating: { type: Number },
    globalRank: { type: Number },
    countryRank: { type: Number },
    starts: { type: Number },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Codechef", codechefSchema);
