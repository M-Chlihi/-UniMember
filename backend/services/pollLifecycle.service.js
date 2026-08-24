const Poll = require("../models/Poll");
const PollOption = require("../models/PollOption");
const { createPollResultNotification } = require("./notification.service");
const { getPollResults } = require("./vote.service");
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

  poll.status = "SCHEDULED";

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

const transitionScheduledPolls = async () => {
  const now = new Date();

  const polls = await Poll.find({
    status: "SCHEDULED",
    startsAt: {
      $lte: now,
    },
    endsAt: { $gt: now },
  }).exec();

  for (const poll of polls) {
    poll.status = "OPEN";

    await poll.save();
  }
};

const transitionOpenPolls = async () => {
  const now = new Date();

  const polls = await Poll.find({
    status: "OPEN",
    endsAt: {
      $lte: now,
    },
  })
    .populate("createdBy", "email username")
    .exec();

  for (const poll of polls) {
    poll.status = "CLOSED";

    await poll.save();

    const results = await getPollResults(poll._id);

    await createPollResultNotification({
      poll,
      recipientId: poll.createdBy._id,
    });
  }
};

module.exports = {
  publishPoll,
  closePoll,
  transitionScheduledPolls,
  transitionOpenPolls,
};
