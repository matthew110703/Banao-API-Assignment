const express = require("express");
const multer = require("multer");

// Middleware
const authenticate = require("../middleware/authenticate");
const upload = multer({ storage: multer.memoryStorage() });

// Controllers
const {
  getAllPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
  savePost,
  unsavePost,
  getComments,
  addComment,
} = require("../controllers/postController");

// Validators
const {
  createPostValidator,
  updatePostValidator,
} = require("../lib/validators");
// Routes
const postRoutes = express.Router();

// Misc
const { tags } = require("../lib/helper");
postRoutes.route("/tags").get((req, res) => {
  console.log(tags);
  res.json({ tags });
});

postRoutes
  .route("/")
  .get(getAllPosts) // Public route
  .post(authenticate, upload.single("image"), createPostValidator, createPost);
postRoutes
  .route("/:id")
  .get(getPostById) // Public route
  .put(authenticate, upload.single("image"), updatePostValidator, updatePost)
  .delete(authenticate, deletePost);

// Like and Unlike
postRoutes.route("/:id/like").put(authenticate, likePost);
postRoutes.route("/:id/unlike").put(authenticate, unlikePost);

// Save and Unsave
postRoutes.route("/:id/save").put(authenticate, savePost);
postRoutes.route("/:id/unsave").put(authenticate, unsavePost);

// Comments
postRoutes
  .route("/:id/comments")
  .get(getComments)
  .post(authenticate, addComment);

module.exports = postRoutes;
