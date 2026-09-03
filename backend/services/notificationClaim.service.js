const Notification = require("../models/Notification");

const { NOTIFICATION_STATUS } = require("../utils/notificationConstantes");

const { MAX_ATTEMPTS } = require("../utils/retryPolicy");

const claimNotification = async (notificationId) => {
  const now = new Date();

  const notification = await Notification.findOneAndUpdate(
    {
      _id: notificationId,

      $or: [
        {
          status: NOTIFICATION_STATUS.PENDING,
        },

        {
          status: NOTIFICATION_STATUS.FAILED,

          attempts: {
            $lt: MAX_ATTEMPTS,
          },

          nextAttemptAt: {
            $ne: null,
            $lte: now,
          },
        },
      ],
    },

    {
      $set: {
        status: NOTIFICATION_STATUS.PROCESSING,

        lastAttemptAt: now,

        processingStartedAt: now,

        error: null,
      },

      $inc: {
        attempts: 1,
      },
    },

    {
      new: true,
    },
  )
    .populate("recipientId", "email username")
    .populate("pollId", "title")
    .exec();

  return notification;
};

module.exports = {
  claimNotification,
};
