const express = require("express");

const app = express();
const PORT = process.env.PORT || 3100;

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("Welcome to the Social Media Management API!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
