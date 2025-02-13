// Models
const User = require("../models/userSchema");
const UserProfile = require("../models/userProfileSchema");
const Post = require("../models/postSchema");

// Validators
const { validationResult, matchedData } = require("express-validator");

/** Get User */
module.exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

/** Get Authenticated User */
module.exports.getCurrentUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id).select("-password");

    res.json(user);
  } catch (error) {
    next(error);
  }
};

/** Update authenticated User */
module.exports.updateCurrentUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.user;
    const { fullname, bio, gender, newEmail, newUsername } = matchedData(req);

    const existingUser = await User.findOne({
      $or: [{ email: newEmail }, { username: newUsername }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email or username already exists" });
    }

    const user = await User.findByIdAndUpdate(
      id,
      {
        fullname,
        email: newEmail,
        username: newUsername,
        bio,
        gender,
      },
      { new: true }
    );

    res.json({ success: true, message: "User updated", user });
  } catch (error) {
    next(error);
  }
};

/** Delete authenticated User */
module.exports.deleteCurrentUser = async (req, res, next) => {
  try {
    const { id } = req.user;

    await User.deleteOne({ _id: id });
    await UserProfile.findOneAndDelete({ user: id });
    await Post.deleteMany({ user: id });
    await Comment.deleteMany({ user: id });

    res.json({ success: true, message: "User deleted" });
  } catch (error) {
    next(error);
  }
};
