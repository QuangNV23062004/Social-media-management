const DatabaseTransaction = require("../repositories/DatabaseTransaction");

const suspendedUserService = async (userId, duration) => {
  const connection = new DatabaseTransaction();
  try {
    const user = await connection.userRepository.suspendedUserRepository(
      userId,
      duration
    );
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
const endSuspenseService = async (userId) => {
  const connection = new DatabaseTransaction();
  try {
    const user = await connection.userRepository.endSuspenseRepository(userId);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  suspendedUserService,
  endSuspenseService,
};
