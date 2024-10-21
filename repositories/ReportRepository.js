const Report = require("../entities/ReportEntity");
class ReportRepository {
  async createReport(data) {
    try {
      const report = await Report.create(data);
      return report;
    } catch (error) {
      throw error;
    }
  }

  async checkIfReportExists(reporter, reportedUser) {
    try {
      const report = await Report.findOne({
        reporter: reporter,
        reportedUser: reportedUser,
      });
      return report;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ReportRepository;
