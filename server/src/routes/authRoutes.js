const express = require("express");

// Middleware
// Validators
const {
  signUpValidator,
  signInValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require("../lib/validators");

// Controllers
const {
  signUp,
  login,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

const authRoutes = express.Router();

authRoutes.post("/signup", signUpValidator, signUp);
authRoutes.post("/login", signInValidator, login);
authRoutes.post("/logout", logout);
authRoutes.post("/refresh-token", refreshToken);
authRoutes.post("/forgot-password", forgotPasswordValidator, forgotPassword);
authRoutes.post("/reset-password", resetPasswordValidator, resetPassword);

module.exports = authRoutes;
