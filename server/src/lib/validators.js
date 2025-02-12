const { body, query } = require("express-validator");

module.exports.signUpValidator = [
  body("fullname")
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Full name must be between 3 to 50 characters"),
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .trim()
    .toLowerCase()
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 to 20 characters"),
  body("email").notEmpty().isEmail().withMessage("Email is required"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];

module.exports.signInValidator = [
  body("email").optional().trim().isEmail().withMessage("Invalid Email"),
  body("username").trim().toLowerCase(),

  body().custom((value, { req }) => {
    if (!req.body.email && !req.body.username) {
      throw new Error("Either email or username is required");
    }
    return true;
  }),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];

module.exports.forgotPasswordValidator = [
  body("email").optional().trim().isEmail().withMessage("Invalid Email"),
  body("username").trim().toLowerCase(),

  body().custom((value, { req }) => {
    if (!req.body.email && !req.body.username) {
      throw new Error("Either email or username is required");
    }
    return true;
  }),
];

module.exports.resetPasswordValidator = [
  body("resetToken").notEmpty().withMessage("Reset token is required"),
  body("newPassword")
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];
