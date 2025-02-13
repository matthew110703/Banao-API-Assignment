const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const app = express();

// Middleware
app.use(cookieParser());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome To API!" });
});
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));

// Error handler
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

module.exports = app;
