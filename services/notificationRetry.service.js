const Notification = require("../models/Notification");

const { NOTIFICATION_STATUS } = require("../utils/notificationConstantes");

const { MAX_ATTEMPTS } = require("../utils/retryPolicy");

const { claimNotification } = require("./notificationClaim.service");

const { deliverClaimedNotification } = require("./notification.service");

const processNotifications = async () => {
  const now = new Date();

  const candidates = await Notification.find({
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
  })
    .select("_id")
    .sort({ createdAt: 1 })
    .limit(100)
    .exec();

  // console.log(`Notification candidates found: ${candidates.length}`);

  for (const candidate of candidates) {
    try {
      const claimed = await claimNotification(candidate._id);

      if (!claimed) {
        console.log(`Notification ${candidate._id} was already claimed`);

        continue;
      }

      console.log(`Notification ${candidate._id} claimed`);

      await deliverClaimedNotification(claimed);
    } catch (err) {
      console.error(`Notification ${candidate._id} processing failed:`, err);
    }
  }
};

module.exports = {
  processNotifications,
};
// const retryFailedNotifications = async () => {
//   const now = new Date();

//   const candidates = await Notification.find({
//     status: NOTIFICATION_STATUS.FAILED,

//     attempts: {
//       $lt: MAX_ATTEMPTS,
//     },

//     nextAttemptAt: {
//       $lte: now,
//     },
//   })
//     .select("_id")
//     .limit(100)
//     .exec();

//   for (const candidate of candidates) {
//     try {
//       const claimed = await claimNotification(candidate._id);

//       if (!claimed) {
//         continue;
//       }

//       await deliverClaimedNotification(claimed);
//     } catch (err) {
//       console.error(`Retry failed for notification ${candidate._id}:`, err);
//     }
//   }
// };

// module.exports = {
//   retryFailedNotifications,
// };
