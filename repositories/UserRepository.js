const { default: mongoose } = require("mongoose");
const User = require("../entities/UserEntity");
const { durationToString } = require("../utils/reformat");
class UserRepository {
  //admin suspense a user
  async suspendedUserRepository(userId, duration) {
    try {
      const user = await User.findOne({
        _id: new mongoose.Types.ObjectId(userId),
        isDeleted: false,
      });

      if (user) {
        (user.suspense.isSuspended = true),
          (user.suspense.duration = await durationToString(duration)),
          (user.suspense.endTime = Date.now() + duration * 86400000); // duration in days
        user.suspense.time = user.suspense.time + 1 || 1;
        await user.save();
      }
      if (!user) {
        throw new Error("No user found");
      }
      return user;
    } catch (error) {
      throw new Error(`Error suspending a user: ${error.message}`);
    }
  }
  //admin unsuspense a user manually(misclick)
  async endSuspenseRepository(userId) {
    try {
      const user = await User.findOne({
        _id: new mongoose.Types.ObjectId(userId),
        isDeleted: false,
        "suspense.isSuspended": true,
      });
      if (user) {
        user.suspense.isSuspended = false;
        user.suspense.endTime = null;
        user.suspense.duration = null;
        user.suspense.time =
          user.suspense.time - 1 > 0 ? user.suspense.time - 1 : 0;
        await user.save();
      }

      return user;
    } catch (error) {
      throw new Error(`Error ending suspense for a user: ${error.message}`);
    }
  }
  //auto update in cron job
  async endSuspenseCronRepository(userId) {
    try {
      const user = await User.findOne({
        _id: new mongoose.Types.ObjectId(userId),
        isDeleted: false,
        "suspense.isSuspended": true,
      });
      if (user) {
        user.suspense.isSuspended = false;
        user.suspense.endTime = null;
        user.suspense.duration = null;
        await user.save();
      }

      return user;
    } catch (error) {
      console.log("error ending suspense");
    }
  }
  //for middlewares
  async findUserById(userId) {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (error) {
      throw new Error(`Error when finding user by id: ${error.message}`);
    }
  }
  async findAllSuppenseAccountEndTine() {
    const users = await User.find({
      "suspense.isSuspended": true,
    });
    return users;
  }
}
module.exports = UserRepository;
