const StatusCodeEnums = require("../enums/StatusCodeEnum");
const CoreException = require("../exceptions/CoreException");
const { validMongooseObjectId } = require("../utils/validator");

class CreateReportDto {
  constructor(reporterId, reportedId, reason, description) {
    this.reporterId = reporterId;
    this.reportedId = reportedId;
    this.reason = reason;
    this.description = description;
  }

  async validate() {
    if (this.reporterId === this.reportedId) {
      throw new CoreException(
        StatusCodeEnums.BadRequest_400,
        "You can't report yourself"
      );
    }
    if (!this.reporterId)
      throw new CoreException(
        StatusCodeEnums.BadRequest_400,
        "Reporter id is required"
      );
    await validMongooseObjectId(this.reporterId);
    if (!this.reportedId)
      throw new CoreException(
        StatusCodeEnums.BadRequest_400,
        "Reported id is required"
      );
    await validMongooseObjectId(this.reportedId);
    if (!this.reason)
      throw new CoreException(
        StatusCodeEnums.BadRequest_400,
        "Reason is required"
      );
  }
}

module.exports = CreateReportDto;
