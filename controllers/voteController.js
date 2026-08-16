const Poll = require("../models/Poll");
const PollOption = require("../models/PollOption");
const Vote = require("../models/Vote");
const { getPollResults } = require("../services/vote.service");

// Does the poll exist?
// yes
// Is the poll OPEN?
// done
// Does the option exist?
// done
// Does the option belong to this poll?
// done
// Has this user already voted in this poll?
// done
// Create vote
const castVote = async (req, res) => {
  const { pollId } = req.params;
  const { optionId } = req.body;
  const userId = req.user;

  try {
    // i have to find poll
    const poll = await Poll.findById(pollId).exec();

    if (!poll) {
      return res.status(404).json({
        message: "Poll not found",
      });
    }

    //and poll must be OPEN
    if (poll.status !== "OPEN") {
      return res.status(409).json({
        message: "This poll is not open for voting",
      });
    }

    if (new Date() >= poll.endsAt) {
      // rej cue we can close poll manually if the admin want to do that
      return res.status(409).json({
        message: " Voting has ended",
      });
    }

    //  find option
    const option = await PollOption.findById(optionId).exec();

    if (!option) {
      return res.status(404).json({
        message: "Poll option not found",
      });
    }

    // and thez option must app to this poll
    if (option.pollId.toString() !== pollId) {
      return res.status(400).json({
        message: "Option does not belong to this poll",
      });
    }

    //also check whether user already voted
    // and msot critique is handling case if we receive 2 req at the same time from the same cleint (mong key doc)
    const existingVote = await Vote.findOne({
      pollId,
      userId,
    }).exec();

    if (existingVote) {
      return res.status(409).json({
        message: "You have already voted in this poll",
      });
    }

    // create vote
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

const getResults = async (req, res) => {
  const { pollId } = req.params;

  try {
    const poll = await Poll.findById(pollId).select("status").exec();

    if (!poll) {
      return res.status(404).json({
        message: "Poll not found",
      });
    }

    if (poll.status !== "CLOSED") {
      return res.status(409).json({
        message: "Results are available after the poll closes",
      });
    }

    const results = await getPollResults(pollId);

    return res.status(200).json({
      pollId,
      ...results,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  castVote,
  getResults,
};
