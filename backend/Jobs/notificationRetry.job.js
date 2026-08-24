const {
  processNotifications,
} = require("../services/notificationRetry.service");

const runNotificationRetryJob = async () => {
  try {
    await processNotifications();
  } catch (err) {
    console.error("Notification retry job failed:", err);
  }
};

module.exports = {
  runNotificationRetryJob,
};
