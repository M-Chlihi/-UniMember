const mongoose = require("mongoose");
const Notification = require("../models/Notification");
const { NOTIFICATION_STATUS } = require("../utils/notificationConstantes");

const getNotificationSummary = async ({ pollId, type, channel } = {}) => {
  const match = {};

  // Add filters only when they were actually provided.
  if (pollId) {
    if (!mongoose.Types.ObjectId.isValid(pollId)) {
      const error = new Error("Invalid pollId");

      error.statusCode = 400;

      throw error;
    }

    match.pollId = new mongoose.Types.ObjectId(pollId);
  }

  if (type) {
    match.type = type;
  }

  if (channel) {
    match.channel = channel;
  }

  console.log("Notification summary match:", match);

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

  counts.deliveryRate =
    counts.total > 0
      ? Number(((counts.sent / counts.total) * 100).toFixed(2))
      : 0;

  console.log("Notification summary:", counts);
  return counts;
};

module.exports = {
  getNotificationSummary,
};
