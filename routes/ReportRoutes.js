const express = require("express");
const reportRouter = express.Router();
const ReportController = require("../controllers/ReportController");
const reportController = new ReportController();
const AuthMiddleware = require("../middlewares/AuthMiddleware");

reportRouter.post("/", AuthMiddleware, reportController.createReportController);

module.exports = reportRouter;
