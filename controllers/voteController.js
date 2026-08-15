const Poll = require("../models/Poll");
const PollOption = require("../models/PollOption");
const Vote = require("../models/Vote");

// Does the poll exist?
// yes
// Is the poll OPEN?
// done
// Does the option exist?
// Does the option belong to this poll?
// Has this user already voted in this poll?
// Create vote
const castVote = async (req, res) => {
  const { pollId } = req.params;
  const { optionId } = req.body;
  const userId = req.user;

  try {
    // 1. Find poll
    const poll = await Poll.findById(pollId).exec();

    if (!poll) {
      return res.status(404).json({
        message: "Poll not found",
      });
    }

    // 2. Poll must be OPEN
    if (poll.status !== "OPEN") {
      return res.status(409).json({
        message: "This poll is not open for voting",
      });
    }

    // 3. Find option
    const option = await PollOption.findById(optionId).exec();

    if (!option) {
      return res.status(404).json({
        message: "Poll option not found",
      });
    }

    // 4. Option must belong to this poll
    if (option.pollId.toString() !== pollId) {
      return res.status(400).json({
        message: "Option does not belong to this poll",
      });
    }

    // 5. Check whether user already voted
    const existingVote = await Vote.findOne({
      pollId,
      userId,
    }).exec();

    if (existingVote) {
      return res.status(409).json({
        message: "You have already voted in this poll",
      });
    }

    // 6. Create vote
    const vote = await Vote.create({
      pollId,
      optionId,
      userId,
    });

    return res.status(201).json({
      message: "Vote submitted successfully",
      voteId: vote._id,
    });
  } catch (err) {
    console.error(err);

    if (err.code === 11000) {
      return res.status(409).json({
        message: "You have already voted in this poll",
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  castVote,
};
