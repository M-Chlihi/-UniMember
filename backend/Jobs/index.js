const { runPollLifecycleJob } = require("./pollLifecycle.job");

const { runNotificationRetryJob } = require("./notificationRetry.job");

const { recoverStuckNotifications } = require("./notificationRecovery.job");

const startJobs = async () => {
  await runPollLifecycleJob();
  await runNotificationRetryJob();
  await recoverStuckNotifications();
  setInterval(runPollLifecycleJob, 10_000);

  setInterval(runNotificationRetryJob, 10_000);

  setInterval(recoverStuckNotifications, 60_000);
  return () => {
    clearInterval(pollLifecycleInterval);
    clearInterval(notificationRetryInterval);
    clearInterval(notificationRecoveryInterval);
  };
};

module.exports = {
  startJobs,
};
