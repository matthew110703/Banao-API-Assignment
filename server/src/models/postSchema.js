const mongoose = require("mongoose");
const { tags } = require("../lib/helper");

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    image: {
      type: String,
      default: "",
    },
    tags: {
      type: [String],
      enum: tags,
      default: ["general"],
      maxlength: 5,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

postSchema.index({ user: 1, createdAt: -1, _id: 1, tags: 1 });

module.exports = mongoose.model("Post", postSchema);
