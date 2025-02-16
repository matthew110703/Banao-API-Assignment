const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Model
const User = require("../models/userSchema");
const UserProfile = require("../models/userProfileSchema");

// Validators
const { validationResult, matchedData } = require("express-validator");

/** User Registration */
module.exports.signUp = async (req, res, next) => {
  // Validate user input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, email, password } = matchedData(req);

    // Check if user already exists
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    // Create new user profile
    await UserProfile.create({ user: newUser._id });

    // Generate access & refresh token
    const accessToken = jwt.sign(
      { id: newUser._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "5m",
      }
    );
    const refreshToken = jwt.sign(
      { id: newUser._id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Set refresh token in cookie
    res.cookie("refeshToken", refreshToken, {
      httpOnly: true,
    });

    res.json({ success: true, message: "User Created", accessToken });
  } catch (error) {
    next(error);
  }
};

/** User Login */
module.exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, username, password } = matchedData(req);

    // Check if user exists
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate access & refresh token
    const accessToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // Set refresh token in cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });

    res.json({ success: true, message: "Login Successful", accessToken });
  } catch (error) {
    next(error);
  }
};

/** User Logout */
module.exports.logout = async (req, res, next) => {
  try {
    res.clearCookie("refreshToken");
    res.json({ success: true, message: "User logged out" });
  } catch (error) {
    next(error);
  }
};

/** Refresh Token */
module.exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    // Check if refresh token exists
    if (!refreshToken) {
      return res.status(401).json({ error: "User not logged in" });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Generate new access token
    const accessToken = jwt.sign(
      { id: decoded.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // (Optional) Regenerate a new refresh token for security
    const newRefreshToken = jwt.sign(
      { id: decoded.id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // Set new refresh token in httpOnly cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure in production
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.json({
      success: true,
      message: "Token refreshed",
      accessToken,
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Refresh token expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid refresh token" });
    }

    console.error("Refresh Token Error:", error); // Log for debugging
    next(error);
  }
};

/** Forgot Password */
module.exports.forgotPassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, username } = matchedData(req);

    // Check if user exists
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Generate password reset token
    const resetToken = jwt.sign(
      { id: user._id },
      process.env.RESET_PASSWORD_TOKEN_SECRET,
      { expiresIn: "5m" }
    );

    res.json({
      success: true,
      resetToken,
      message:
        "Use this token to reset your password. Token expires in 5 minutes.",
    });
  } catch (error) {
    next(error);
  }
};

/** Reset Password */
module.exports.resetPassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { resetToken, newPassword } = matchedData(req);

    // Verify reset token
    const decoded = jwt.verify(
      resetToken,
      process.env.RESET_PASSWORD_TOKEN_SECRET
    );

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password
    await User.findByIdAndUpdate(decoded.id, { password: hashedPassword });

    res.json({ success: true, message: "Password reset successful" });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(400).json({ error: "Reset token expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(400).json({ error: "Invalid reset token" });
    }

    console.error("Reset Password Error:", error);
    next(error);
  }
};
