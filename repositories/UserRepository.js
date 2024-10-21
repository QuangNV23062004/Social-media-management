const User = require("../entities/UserEntity");

class UserRepository {
  async findUserById(userId) {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (error) {
      throw new Error(`Error when finding user by id: ${error.message}`);
    }
  }
  async suspendedUser(userId, duration) {
    const user = await User.findOne({ id: userId, isDeleted: false });
    if (user) {
      (user.suspense.isSuspended = true),
        (user.suspense.duration = duration),
        (user.suspense.endTime = Date.now() + duration * 86400000); // duration in days
      user.time = user.time + 1 || 1;
    }
    await user.save();
    return user;
  }
}

module.exports = UserRepository;