const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    const bearer = req.headers.authorization;
    if (!bearer || !bearer.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized. Access Token required." });
    }

    const token = bearer.split("Bearer ")[1].trim();
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    // Invalid token
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Unauthorized. Invalid Token" });
    }
    // Token expired
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Session expired" });
    }

    next(error);
  }
};

module.exports = authenticate;
