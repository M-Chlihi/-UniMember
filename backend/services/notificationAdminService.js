const { NOTIFICATION_STATUS } = require("../utils/notificationConstantes");
const getNotificationSummary = async ({ pollId, type, channel }) => {
  const match = {
    pollId,
    type,
    channel,
  };

  const summary = await Notification.aggregate([
    {
      $match: match,
    },

    {
      $group: {
        _id: "$status",
        count: {
          $sum: 1,
        },
      },
    },
  ]);

  const counts = {
    total: 0,
    pending: 0,
    processing: 0,
    sent: 0,
    failed: 0,
  };

  for (const row of summary) {
    counts.total += row.count;

    switch (row._id) {
      case NOTIFICATION_STATUS.PENDING:
        counts.pending = row.count;
        break;

      case NOTIFICATION_STATUS.PROCESSING:
        counts.processing = row.count;
        break;

      case NOTIFICATION_STATUS.SENT:
        counts.sent = row.count;
        break;

      case NOTIFICATION_STATUS.FAILED:
        counts.failed = row.count;
        break;
    }
  }

  return counts;
};
