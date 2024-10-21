const durationToString = async (duration) => {
  // Multiply by milliseconds in 24 hours
  let totalMs = duration * 86400000;

  // Calculate the different time units
  const years = Math.floor(totalMs / (365 * 86400000));
  totalMs %= 365 * 86400000;

  const months = Math.floor(totalMs / (30 * 86400000)); // Approximate month as 30 days
  totalMs %= 30 * 86400000;

  const days = Math.floor(totalMs / 86400000);
  totalMs %= 86400000;

  const hours = Math.floor(totalMs / 3600000);
  totalMs %= 3600000;

  const minutes = Math.floor(totalMs / 60000);
  totalMs %= 60000;

  const seconds = Math.floor(totalMs / 1000);

  // Build the result string
  const result = [];
  if (years > 0) result.push(`${years} year${years > 1 ? "s" : ""}`);
  if (months > 0) result.push(`${months} month${months > 1 ? "s" : ""}`);
  if (days > 0) result.push(`${days} day${days > 1 ? "s" : ""}`);
  if (hours > 0) result.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  if (minutes > 0) result.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);
  if (seconds > 0) result.push(`${seconds} second${seconds > 1 ? "s" : ""}`);

  return result.length > 0 ? result.join(", ") : "0 seconds";
};
module.exports = {
  durationToString,
};
