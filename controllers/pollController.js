const Poll = require("../models/Poll");
const { publishPoll, closePoll } = require("../services/pollLifecycle.service");
const createPoll = async (req, res) => {
  const { title, description, startsAt, endsAt } = req.body;

  try {
    const poll = await Poll.create({
      title,
      description,
      startsAt,
      endsAt,
      createdBy: req.user,
    });

    return res.status(201).json({
      message: "Poll created successfully",
      poll,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const publishPollController = async (req, res) => {
  const { pollId } = req.params;

  try {
    const poll = await publishPoll(pollId);

    return res.status(200).json({
      message: "Poll published successfully",
      poll,
    });
  } catch (err) {
    console.error(err);

    return res.status(err.status || 500).json({
      message: err.status ? err.message : "Internal server error",
    });
  }
};
const closePollController = async (req, res) => {
  const { pollId } = req.params;

  try {
    const poll = await closePoll(pollId);

    return res.status(200).json({
      message: "Poll closed successfully",
    });
  } catch (err) {
    console.error(err);

    return res.status(err.status || 500).json({
      message: err.status ? err.message : "Internal server error",
    });
  }
};
module.exports = {
  createPoll,
  publishPollController,
  closePollController,
};
