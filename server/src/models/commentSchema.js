const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
  },
  { timestamps: true }
);

commentSchema.index({ post: 1, user: 1 });

module.exports = mongoose.model("Comment", commentSchema);
