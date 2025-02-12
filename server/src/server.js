// Load environment variables
const dotenv = require("dotenv");
dotenv.config();

// Load app
const app = require("./app");

// Database connection
const connectDB = require("./lib/connectDB");
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
