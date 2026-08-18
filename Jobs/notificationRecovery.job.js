const Notification = require("../models/Notification");

const { NOTIFICATION_STATUS } = require("../utils/notificationConstantes");

const {
  calculateNextAttemptAt,
  MAX_ATTEMPTS,
} = require("../utils/retryPolicy");

const PROCESSING_TIMEOUT_MS = 5 * 60 * 1000;

const recoverStuckNotifications = async () => {
  const cutoff = new Date(Date.now() - PROCESSING_TIMEOUT_MS);

  const stuck = await Notification.find({
    status: NOTIFICATION_STATUS.PROCESSING,

    processingStartedAt: {
      $lte: cutoff,
    },
  }).exec();

  for (const notification of stuck) {
    if (notification.attempts >= MAX_ATTEMPTS) {
      notification.status = NOTIFICATION_STATUS.FAILED;

      notification.processingStartedAt = null;

      notification.nextAttemptAt = null;

      notification.error = "Maximum attempts reached after processing timeout";

      await notification.save();

      continue;
    }

    notification.status = NOTIFICATION_STATUS.FAILED;

    notification.processingStartedAt = null;

    notification.nextAttemptAt = calculateNextAttemptAt(notification.attempts);

    notification.error = "Worker processing timeout";

    await notification.save();
  }
};

module.exports = {
  recoverStuckNotifications,
};
