const Poll = require("../models/Poll");
const { publishPoll, closePoll } = require("../services/pollLifecycle.service");
const PollOption = require("../models/PollOption");
const Vote = require("../models/Vote");

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

const getActivePoll = async (req, res, next) => {
  try {
    const poll = await Poll.findOne({
      status: "OPEN",
    })
      .sort({ startsAt: -1 })
      .lean();

    if (!poll) {
      return res.status(404).json({
        message: "No active poll",
      });
    }

    const options = await PollOption.find({
      pollId: poll._id,
    })
      .select("_id title description")
      .lean();

    const existingVote = await Vote.findOne({
      pollId: poll._id,
      userId: req.user,
    })
      .select("_id")
      .lean();

    return res.json({
      poll: {
        ...poll,
        options,
      },
      hasVoted: Boolean(existingVote),
    });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  createPoll,
  publishPollController,
  closePollController,
  getActivePoll,
};
