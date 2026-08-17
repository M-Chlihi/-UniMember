const Notification = require("../models/Notification");
const { deliverNotification } = require("./notification.service");
const { MAX_ATTEMPTS } = require("../utils/retryPolicy");

const claimNotification = async (notificationId) => {
  const now = new Date();

  const notification = await Notification.findOneAndUpdate(
    {
      _id: notificationId,

      status: "FAILED",

      attempts: {
        $lt: MAX_ATTEMPTS,
      },

      nextAttemptAt: {
        $lte: now,
      },
    },

    {
      $set: {
        status: "PROCESSING",
        lastAttemptAt: now,
      },

      $inc: {
        attempts: 1,
      },
    },

    {
      new: true,
    },
  ).exec();

  return notification;
};

const retryFailedNotifications = async () => {
  const now = new Date();

  const notifications = await Notification.find({
    status: "FAILED",
    attempts: { $lt: MAX_ATTEMPTS },
    nextAttemptAt: { $lte: now },
  }).exec();

  for (const notification of notifications) {
    const claimed = await claimNotification(notification._id);

    if (!claimed) {
      continue;
    }
    try {
      await deliverNotification(notification._id);
    } catch (err) {
      console.error(
        `Notification retry failed: ${notification._id}`,
        err.message,
      );
    }
  }
};

module.exports = {
  retryFailedNotifications,
};
