const express = require("express");
const cors = require("cors");

const reportRouter = require("./routes/ReportRoutes");
const UserRoute = require("./routes/UserRoute");
const app = express();
const PORT = process.env.PORT || 3100;

// Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get("/", (req, res) => {
  res.send("Welcome to the Social Media Management API!");
});
app.use("/api/reports", reportRouter);
app.use("/api/user", UserRoute);
// Start the server
app.listen(PORT, () => {
  require("./utils/cronJob");
  console.log(`Server is running on port ${PORT}`);
});
