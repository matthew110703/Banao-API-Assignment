const express = require("express");

// Middleware
const authenticate = require("../middleware/authenticate");

// Controllers
const {
  editComment,
  deleteComment,
} = require("../controllers/commentController");

const commentRoutes = express.Router();

commentRoutes
  .route("/:id")
  .put(authenticate, editComment)
  .delete(authenticate, deleteComment);

module.exports = commentRoutes;
