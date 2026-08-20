const Poll = require("../models/Poll");
const PollOption = require("../models/PollOption");

const updatePoll = async (pollId, changes) => {
  const poll = await Poll.findById(pollId).exec();

  if (!poll) {
    const error = new Error("Poll not found");
    error.status = 404;
    throw error;
  }

  if (poll.status !== "DRAFT" && poll.status !== "SCHEDULED") {
    const error = new Error("This poll can no longer be edited");

    error.status = 409;
    throw error;
  }

  const nextStartsAt = changes.startsAt ?? poll.startsAt;

  const nextEndsAt = changes.endsAt ?? poll.endsAt;

  if (nextEndsAt <= nextStartsAt) {
    const error = new Error("endsAt must be after startsAt");

    error.status = 400;
    throw error;
  }

  Object.assign(poll, changes);

  await poll.save();

  return poll;
};

const cancelPoll = async (pollId) => {
  const poll = await Poll.findById(pollId).exec();

  if (!poll) {
    const error = new Error("Poll not found");
    error.status = 404;
    throw error;
  }

  if (
    poll.status !== "DRAFT" &&
    poll.status !== "SCHEDULED" &&
    poll.status !== "OPEN"
  ) {
    const error = new Error("This poll cannot be cancelled");

    error.status = 409;
    throw error;
  }

  poll.status = "CANCELLED";

  await poll.save();

  return poll;
};

const deleteDraftPoll = async (pollId) => {
  const poll = await Poll.findById(pollId).exec();

  if (!poll) {
    const error = new Error("Poll not found");
    error.status = 404;
    throw error;
  }

  if (poll.status !== "DRAFT") {
    const error = new Error("Only draft polls can be permanently deleted");

    error.status = 409;
    throw error;
  }

  await PollOption.deleteMany({
    pollId,
  });

  await Poll.findByIdAndDelete(pollId);

  return true;
};

module.exports = { updatePoll, cancelPoll, deleteDraftPoll };
