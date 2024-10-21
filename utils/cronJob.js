const cron = require("node-cron");
const DatabaseTransaction = require("../repositories/DatabaseTransaction");
const connection = new DatabaseTransaction();
// Schedule a task to run every minute
cron.schedule("* * * * *", async () => {
  const users = await connection.userRepository.findAllSuppenseAccountEndTine();
  console.log(`${users.length || 0} user suspended`);
  users.map(async (user) => {
    if (new Date() > new Date(user.suspense.endTime)) {
      await connection.userRepository.endSuspenseCronRepository(user._id);
    }
  });
  console.log(`Log entry at ${new Date().toISOString()}`);
});

console.log("Cron job scheduled to log every minute.");
