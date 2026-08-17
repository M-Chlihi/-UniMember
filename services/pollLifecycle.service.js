const Poll = require("../models/Poll");
const PollOption = require("../models/PollOption");
const { createPollResultNotification } = require("./notification.service");
const { getPollResults } = require("./vote.service");
const { retryFailedNotifications } = require("./notificationRetry.service");
const publishPoll = async (pollId) => {
  const poll = await Poll.findById(pollId).exec();
  if (!poll) {
    const error = new Error("Poll not found");
    error.status = 404;
    throw error;
  }

  if (poll.status !== "DRAFT") {
    const error = new Error("Only draft polls can be published");
    error.status = 409;
    throw error;
  }

  const optionsCount = await PollOption.countDocuments({
    pollId,
  });

  if (optionsCount < 3 || optionsCount > 4) {
    const error = new Error(
      "A poll must contain between 3 and 4 options before publishing",
    );
    error.status = 409;
    throw error;
  }

  const now = new Date();

  if (poll.startsAt < now) {
    const error = new Error("Poll start date must be in the future");
    error.status = 409;
    throw error;
  }

  if (poll.endsAt <= poll.startsAt) {
    const error = new Error("Poll end date must be after start date");
    error.status = 409;
    throw error;
  }

  poll.status = "OPEN";

  await poll.save();

  return poll;
};

const closePoll = async (pollId) => {
  const poll = await Poll.findById(pollId).exec();

  if (!poll) {
    const error = new Error("Poll not found");
    error.status = 404;
    throw error;
  }

  if (poll.status !== "OPEN") {
    const error = new Error("Only open polls can be closed");
    error.status = 409;
    throw error;
  }

  poll.status = "CLOSED";

  await poll.save();

  return poll;
};
//time-based background processing  for automating poll behaviors

const transitionScheduledPolls = async () => {
  const now = new Date();

  await Poll.updateMany(
    {
      status: "DRAFT",
      startsAt: { $lte: now },
      endsAt: { $gt: now },
    },
    {
      $set: {
        status: "OPEN",
      },
    },
  );
};

const transitionOpenPolls = async () => {
  const now = new Date();

  const pollsToClose = await Poll.find({
    status: "OPEN",
    endsAt: { $lte: now },
  }).exec();

  for (const poll of pollsToClose) {
    poll.status = "CLOSED";
    await poll.save();

    // notification later
    const results = await getPollResults(poll._id);

    await createPollResultNotification({
      poll,
      results,
      recipientId: poll.createdBy,
    });
  }
  setInterval(async () => {
    await retryFailedNotifications();
  }, 10_000);
};

module.exports = {
  publishPoll,
  closePoll,
  transitionScheduledPolls,
  transitionOpenPolls,
};
