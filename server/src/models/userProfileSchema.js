const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    posts: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Post",
      default: [],
    },
    likedPosts: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Post",
      default: [],
    },
    savedPosts: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Post",
      default: [],
    },
  },
  { timestamps: true }
);

userProfileSchema.index({ user: 1 });

module.exports = mongoose.model("UserProfile", userProfileSchema);
