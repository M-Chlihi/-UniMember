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

const getNotificationHistory = async ({
  type,
  channel,
  page = 1,
  limit = 20,
}) => {
  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const skip = (pageNumber - 1) * limitNumber;

  const match = {};

  if (type) {
    match.type = type;
  }

  if (channel) {
    match.channel = channel;
  }

  const pipeline = [
    {
      $match: match,
    },

    {
      $group: {
        _id: {
          pollId: "$pollId",
          type: "$type",
          channel: "$channel",
        },

        total: {
          $sum: 1,
        },

        sent: {
          $sum: {
            $cond: [{ $eq: ["$status", "SENT"] }, 1, 0],
          },
        },

        pending: {
          $sum: {
            $cond: [
              {
                $eq: ["$status", "PENDING"],
              },
              1,
              0,
            ],
          },
        },

        processing: {
          $sum: {
            $cond: [
              {
                $eq: ["$status", "PROCESSING"],
              },
              1,
              0,
            ],
          },
        },

        failed: {
          $sum: {
            $cond: [
              {
                $eq: ["$status", "FAILED"],
              },
              1,
              0,
            ],
          },
        },

        createdAt: {
          $min: "$createdAt",
        },
      },
    },

    {
      $sort: {
        createdAt: -1,
      },
    },

    {
      $facet: {
        data: [
          {
            $skip: skip,
          },

          {
            $limit: limitNumber,
          },

          {
            $lookup: {
              from: "polls",
              localField: "_id.pollId",
              foreignField: "_id",
              as: "poll",
            },
          },

          {
            $unwind: {
              path: "$poll",
              preserveNullAndEmptyArrays: true,
            },
          },

          {
            $project: {
              _id: 0,

              pollId: {
                $toString: "$_id.pollId",
              },

              pollTitle: {
                $ifNull: ["$poll.title", null],
              },

              type: "$_id.type",

              channel: "$_id.channel",

              total: 1,

              sent: 1,

              pending: 1,

              processing: 1,

              failed: 1,

              createdAt: 1,
            },
          },
        ],

        metadata: [
          {
            $count: "total",
          },
        ],
      },
    },
  ];

  const [result] = await Notification.aggregate(pipeline);

  const data = result?.data ?? [];

  const total = result?.metadata?.[0]?.total ?? 0;

  const totalPages = Math.ceil(total / limitNumber);

  return {
    data,
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
  getNotificationHistory,
};
