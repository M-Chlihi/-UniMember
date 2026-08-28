const Notification = require("../models/Notification");

const listNotifications = async ({
  pollId,

  status,
  channel,
  type,
  sort = "-createdAt",
  page = 1,
  limit = 20,
}) => {
  const query = {};

  if (pollId) {
    query.pollId = pollId;
  }
  if (status) query.status = status;
  if (channel) query.channel = channel;
  if (type) query.type = type;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const skip = (pageNumber - 1) * limitNumber;

  const sortField = sort.startsWith("-") ? sort.slice(1) : sort;

  const sortDirection = sort.startsWith("-") ? -1 : 1;

  const sortQuery = {
    [sortField]: sortDirection,
  };

  const [notifications, total] = await Promise.all([
    Notification.find(query)
      .populate("recipientId", "username email")
      .populate("pollId", "title")
      .sort(sortQuery)
      .skip(skip)
      .limit(limitNumber)
      .lean(),

    Notification.countDocuments(query),
  ]);

  const totalPages = Math.ceil(total / limitNumber);

  return {
    data: notifications.map((notification) => ({
      id: notification._id.toString(),

      type: notification.type,

      channel: notification.channel,

      status: notification.status,

      recipient: notification.recipientId
        ? {
            id: notification.recipientId._id.toString(),
            username: notification.recipientId.username,
            email: notification.recipientId.email,
          }
        : null,

      poll: notification.pollId
        ? {
            id: notification.pollId._id.toString(),
            title: notification.pollId.title,
          }
        : null,

      attempts: notification.attempts,

      createdAt: notification.createdAt,

      lastAttemptAt: notification.lastAttemptAt,

      sentAt: notification.sentAt,

      nextAttemptAt: notification.nextAttemptAt,

      error: notification.error,
    })),

    pagination: {
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages,
      hasNextPage: pageNumber < totalPages,
      hasPreviousPage: pageNumber > 1,
    },
  };
};

module.exports = {
  listNotifications,
};
