const User = require("../entities/UserEntity");
const StatusCodeEnums = require("../enums/StatusCodeEnum");
const CoreException = require("../exceptions/CoreException");
const DatabaseTransaction = require("../repositories/DatabaseTransaction");
const createReportService = async (
  reporterId,
  reportedId,
  reason,
  description
) => {
  try {
    const connection = new DatabaseTransaction();
    const reporter = await connection.userRepository.findUserById(reporterId);
    if (!reporter)
      throw new CoreException(
        StatusCodeEnums.NotFound_404,
        "Reporter not found"
      );
    const reportedUser = await connection.userRepository.findUserById(
      reportedId
    );
    if (!reportedUser)
      throw new CoreException(
        StatusCodeEnums.NotFound_404,
        "Reported user not found"
      );

    const checkIfReportExists =
      await connection.reportRepository.checkIfReportExists(
        reporter,
        reportedUser
      );
    if (checkIfReportExists)
      throw new CoreException(
        StatusCodeEnums.BadRequest_400,
        "You have already reported this user"
      );

    const report = await connection.reportRepository.createReport({
      reporter,
      reportedUser,
      reason,
      description,
    });

    return report;
  } catch (error) {
    throw error;
  }
};

module.exports = { createReportService };
