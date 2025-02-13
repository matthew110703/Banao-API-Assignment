// Models
const User = require("../models/userSchema");
const UserProfile = require("../models/userProfileSchema");
const Post = require("../models/postSchema");

/** Get User profile */
module.exports.getUserProfile = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const profile = await UserProfile.findOne({ user: id });
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    next(error);
  }
};

/** Get Current User Profile */
module.exports.getCurrentUserProfile = async (req, res, next) => {
  try {
    const { id } = req.user;

    const profile = await UserProfile.findOne({ user: id });
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    next(error);
  }
};

/** Get all post for the authenticated user */
module.exports.getPosts = async (req, res, next) => {
  try {
    const { id } = req.user;

    const posts = await Post.find({ user: id }).sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    next(error);
  }
};

/** Get all Saved Posts */
module.exports.getSavedPosts = async (req, res, next) => {
  try {
    const { id } = req.user;

    const userProfile = await UserProfile.findOne({ user: id });
    if (!userProfile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    const posts = await Post.find({
      _id: { $in: userProfile.savedPosts },
    }).sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    next(error);
  }
};

/** Get all Liked posts */
module.exports.getLikedPosts = async (req, res, next) => {
  try {
    const { id } = req.user;

    const userProfile = await UserProfile.findOne({ user: id });
    if (!userProfile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    const posts = await Post.find({
      _id: { $in: userProfile.likedPosts },
    }).sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    next(error);
  }
};
