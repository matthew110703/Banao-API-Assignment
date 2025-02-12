const express = require("express");
const morgan = require("morgan");

const app = express();

// Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome To API!" });
});

// Error handler
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

module.exports = app;
