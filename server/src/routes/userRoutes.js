const express = require("express");

// Middleware
const authenticate = require("../middleware/authenticate");

// Controllers
const {
  getUser,
  getCurrentUser,
  updateCurrentUser,
  deleteCurrentUser,
} = require("../controllers/userController");
const {
  getUserProfile,
  getCurrentUserProfile,
  getPosts,
  getLikedPosts,
  getSavedPosts,
} = require("../controllers/profileController");

// Validators
const { updateUserValidator } = require("../lib/validators");

const userRoutes = express.Router();

// Authenticated
userRoutes
  .route("/me")
  .get(authenticate, getCurrentUser)
  .put(authenticate, updateUserValidator, updateCurrentUser)
  .delete(authenticate, deleteCurrentUser);
userRoutes.get("/profile", authenticate, getCurrentUserProfile);
userRoutes.get("/posts", authenticate, getPosts);
userRoutes.get("/posts/liked", authenticate, getLikedPosts);
userRoutes.get("/posts/saved", authenticate, getSavedPosts);

// Public
userRoutes.get("/:id", getUser);
userRoutes.get("/:id/profile", getUserProfile);

module.exports = userRoutes;
