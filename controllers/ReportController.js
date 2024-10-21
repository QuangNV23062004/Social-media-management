const CreateReportDto = require("../dtos/CreateReportDto");
const StatusCodeEnums = require("../enums/StatusCodeEnum");
const CoreException = require("../exceptions/CoreException");
const { createReportService } = require("../services/ReportService");

class ReportController {
  async createReportController(req, res) {
    try {
      const reporterId = req.userId;
      const {  reportedId, reason, description } = req.body;
      const createReportDto = new CreateReportDto(
        reporterId,
        reportedId,
        reason,
        description
      );
      await createReportDto.validate();
      const report = await createReportService(
        reporterId,
        reportedId,
        reason,
        description
      );
      return res
        .status(StatusCodeEnums.Created_201)
        .json({
          message: "Report created successfully",
          metadata: {
            reporterId: report.reporter.id,
            reportedId: report.reportedUser.id,
            reason: report.reason,
            description: report.description,
          },
        });
    } catch (error) {
      if (error instanceof CoreException) {
        return res.status(error.code).json({ message: error.message });
      } else {
        return res
          .status(StatusCodeEnums.InternalServerError_500)
          .json({ message: error.message });
      }
    }
  }
}

module.exports = ReportController;
