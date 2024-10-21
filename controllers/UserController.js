const {
  endSuspenseService,
  suspendedUserService,
} = require("../services/UserService");
const StatusCodeEnums = require("../enums/StatusCodeEnum");
class UserController {
  async suspendedUserController(req, res) {
    try {
      const { userId, duration } = req.body;
      if (isNaN(duration)) {
        return res
          .status(StatusCodeEnums.BadRequest_400)
          .json({ message: "Invalid duration" });
      }
      const result = await suspendedUserService(userId, duration);
      res
        .status(StatusCodeEnums.OK_200)
        .json({ user: result, message: "Success" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  async unsuspendedUserController(req, res) {
    try {
      const { userId } = req.body;
      const result = await endSuspenseService(userId);
      return res.status(StatusCodeEnums.OK_200).json(result);
    } catch (error) {
      return res
        .status(StatusCodeEnums.InternalServerError_500)
        .json({ message: error.message });
    }
  }
}

module.exports = UserController;
