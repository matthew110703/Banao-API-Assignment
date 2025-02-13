const mongoose = require("mongoose");

// Models
const Comment = require("../models/commentSchema");
const Post = require("../models/postSchema");
const User = require("../models/userSchema");
const UserProfile = require("../models/userProfileSchema");

/** Edit a Comment */
module.exports.editComment = async (req, res, next) => {
  try {
    const { id } = req.user;

    // Get the comment and user
    const comment = await Comment.findById(req.params.id);

    // Check if the comment exists
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Check if the user is the author of the comment
    if (comment.user.toString() !== id) {
      return res
        .status(403)
        .json({ error: "You are not authorized to edit this comment" });
    }

    // Update the comment
    comment.content = req.body.content;
    comment.edited = true;

    // Save the comment
    await comment.save();

    res.json({ success: true, message: "Comment updated successfully" });
  } catch (error) {
    next(error);
  }
};

/** Delete a Comment */
module.exports.deleteComment = async (req, res, next) => {
  try {
    const { id } = req.user;

    // Get the comment and user
    const comment = await Comment.findById(req.params.id);

    // Check if the comment exists
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Check if the user is the author of the comment
    if (comment.user.toString() !== id) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this comment" });
    }

    // Delete the comment
    await comment.deleteOne();

    res.json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    next(error);
  }
};
