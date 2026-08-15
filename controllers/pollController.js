const Poll = require("../models/Poll");

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

module.exports = {
  createPoll,
};
