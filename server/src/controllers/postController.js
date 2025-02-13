// Models
const Post = require("../models/postSchema");
const User = require("../models/userSchema");
const UserProfile = require("../models/userProfileSchema");
const Comment = require("../models/commentSchema");

// Supabase
const { uploadFile, replaceFile, deleteFile } = require("../lib/supabase");

// Validators
const { validationResult, matchedData } = require("express-validator");

/** Get Posts and Users */
module.exports.getAllPosts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, tag, search, userId } = req.query;

    // Filters
    let users = [];
    let query = {};
    if (tag) query.tags = tag;
    if (search) {
      query.content = { $regex: search, $options: "i" };
      users = await User.find({
        username: { $regex: search, $options: "i" },
      });
    }
    if (userId) query.user = userId;

    const posts = await Post.find(query)
      .populate("user", "username email")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Post.countDocuments();

    res.json({
      posts,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      users,
    });
  } catch (error) {
    next(error);
  }
};

/** Create a new post */
module.exports.createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { content, tags } = matchedData(req);
    const { id } = req.user;
    const image = req.file;

    // Create a new post
    const post = new Post({
      user: id,
      content,
      tags,
    });

    // Upload to Supabase Storage if image is present
    if (image) {
      const imageUrl = await uploadFile(post._id, image);
      if (!imageUrl) {
        return res
          .status(500)
          .json({ error: "Failed to upload image to Supabase" });
      }
      post.image = imageUrl;
      await post.save();
    }

    res.json({ success: true, message: "Post created successfully", post });
  } catch (error) {
    next(error);
  }
};

/** Get a post by ID */
module.exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "user",
      "username email"
    );
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    next(error);
  }
};

/** Update a post by ID (Protected) */
module.exports.updatePost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { content, tags } = matchedData(req);
    const { id } = req.user;
    const image = req.file;

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if user is the owner of the post
    if (post.user.toString() !== id) {
      return res.status(403).json({ error: "You are not authorized" });
    }

    post.content = content || post.content;
    post.tags = tags || post.tags;

    // Upload to Supabase Storage if image is present
    if (image) {
      const imageUrl = await replaceFile(post._id, image);
      if (!imageUrl) {
        return res
          .status(500)
          .json({ error: "Failed to upload image to Supabase" });
      }
      post.image = imageUrl;
    }

    await post.save();

    res.json({ success: true, message: "Post updated successfully", post });
  } catch (error) {
    next(error);
  }
};

/** Delete a post by ID (Protected) */
module.exports.deletePost = async (req, res, next) => {
  try {
    const { id } = req.user;
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if user is the owner of the post
    if (post.user.toString() !== id) {
      return res.status(403).json({ error: "You are not authorized" });
    }

    // Delete image from Supabase Storage
    if (post.image) {
      if (!(await deleteFile(post._id))) {
        return res
          .status(500)
          .json({ error: "Failed to delete image from Supabase" });
      }
    }

    // Get post from users liked posts and saved posts
    const profiles = await UserProfile.find({
      $or: [{ likedPosts: post._id }, { savedPosts: post._id }],
    });

    // Remove post from all user profiles
    for (const profile of profiles) {
      profile.likedPosts = profile.likedPosts.filter(
        (postId) => postId.toString() !== post._id.toString()
      );
      profile.savedPosts = profile.savedPosts.filter(
        (postId) => postId.toString() !== post._id.toString()
      );
      await profile.save();
    }

    await post.deleteOne();

    res.json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};

/** Like a Post */
module.exports.likePost = async (req, res, next) => {
  try {
    const { id } = req.user;

    const profile = await UserProfile.findOne({ user: id });
    const post = await Post.findById(req.params.id);
    if (!profile || !post) {
      return res.status(404).json({ error: "Post or Profile not found" });
    }

    // Check if user has already liked the post
    if (post.likes.includes(id)) {
      return res.status(400).json({ error: "Post already liked" });
    }

    // Add user to post likes
    post.likes.push(id);
    await post.save();

    // Add post to user liked posts
    profile.likedPosts.push(post._id);
    await profile.save();

    res.json({ success: true, message: "Post liked successfully" });
  } catch (error) {
    next(error);
  }
};

/** Unlike a Post */
module.exports.unlikePost = async (req, res, next) => {
  try {
    const { id } = req.user;

    // Get user profile and post
    const profile = await UserProfile.findOne({ user: id });
    const post = await Post.findById(req.params.id);

    // Check if user or post is not found
    if (!profile || !post) {
      return res.status(404).json({ error: "Post or Profile not found" });
    }

    // Check if user has not liked the post
    if (!post.likes.includes(id)) {
      return res.status(400).json({ error: "Post not liked" });
    }

    // Remove user from post likes
    post.likes = post.likes.filter((like) => like.toString() !== id);
    await post.save();

    // Remove post from user liked posts
    profile.likedPosts = profile.likedPosts.filter(
      (postId) => postId.toString() !== post._id.toString()
    );
    await profile.save();

    res.json({ success: true, message: "Post unliked successfully" });
  } catch (error) {
    next(error);
  }
};

/** Save the post to user's saved posts */
module.exports.savePost = async (req, res, next) => {
  try {
    const { id } = req.user;

    // Get user profile and post
    const profile = await UserProfile.findOne({ user: id });
    const post = await Post.findById(req.params.id);

    // Check if user or post is not found
    if (!profile || !post) {
      return res.status(404).json({ error: "Post or Profile not found" });
    }

    // Check if user has already saved the post
    if (profile.savedPosts.includes(post._id)) {
      return res.status(400).json({ error: "Post already saved" });
    }

    // Add post to user saved posts
    profile.savedPosts.push(post._id);
    await profile.save();

    res.json({ success: true, message: "Post saved successfully" });
  } catch (error) {
    next(error);
  }
};

/** Unsave saved post from the user */
module.exports.unsavePost = async (req, res, next) => {
  try {
    const { id } = req.user;

    // Get user profile and post
    const profile = await UserProfile.findOne({ user: id });
    const post = await Post.findById(req.params.id);

    // Check if user or post is not found
    if (!profile || !post) {
      return res.status(404).json({ error: "Post or Profile not found" });
    }

    // Check if user has not saved the post
    if (!profile.savedPosts.includes(post._id)) {
      return res.status(400).json({ error: "Post not saved" });
    }

    // Remove post from user saved posts
    profile.savedPosts = profile.savedPosts.filter(
      (postId) => postId.toString() !== post._id.toString()
    );
    await profile.save();

    res.json({ success: true, message: "Post unsaved successfully" });
  } catch (error) {
    next(error);
  }
};

/** Get all comments of a post */
module.exports.getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.id })
      .populate("user", "username email")
      .sort({ createdAt: -1 })
      .exec();

    res.json(comments);
  } catch (error) {
    next(error);
  }
};

/** Add a comment to the post */
module.exports.addComment = async (req, res, next) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: "Comment content is required" });
    }

    const { id } = req.user;

    // Get user and post
    const user = await User.findById(id);
    const post = await Post.findById(req.params.id);

    // Check if the user and post exist
    if (!user || !post) {
      return res.status(404).json({ error: "User or Post not found" });
    }

    // Create a new comment
    const comment = new Comment({
      user: id,
      post: post._id,
      content,
    });

    await comment.save();

    res.json({ success: true, message: "Comment added successfully", comment });
  } catch (error) {
    next(error);
  }
};
