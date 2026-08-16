const Poll = require("../models/Poll");
const PollOption = require("../models/PollOption");

const GETOptions = async (req, res) => {
  const op = await PollOption.find();
  res.json(op);
};
const createPollOption = async (req, res) => {
  const { pollId } = req.params;
  const { title, description } = req.body;

  try {
    const poll = await Poll.findById(pollId).exec();

    if (!poll) {
      return res.status(404).json({
        message: "Poll not found",
      });
    }

    if (poll.status !== "DRAFT") {
      return res.status(409).json({
        message: "Options can only be added to draft polls",
      });
    }

    const optionsCount = await PollOption.countDocuments({
      pollId,
    });

    if (optionsCount >= 4) {
      return res.status(409).json({
        message: "A poll cannot contain more than 4 options",
      });
    }

    const option = await PollOption.create({
      pollId,
      title,
      description,
    });

    return res.status(201).json({
      message: "Poll option created successfully",
      option,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  createPollOption,
  GETOptions,
};
