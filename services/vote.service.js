const PollOption = require("../models/PollOption");
const mongoose = require("mongoose");

const getPollResults = async (pollId) => {
  const objectPollId = new mongoose.Types.ObjectId(pollId);

  const results = await PollOption.aggregate([
    {
      $match: {
        pollId: objectPollId,
      },
    },

    {
      $lookup: {
        from: "votes",
        localField: "_id",
        foreignField: "optionId",
        as: "votes",
      },
    },

    {
      $project: {
        _id: 0,
        optionId: "$_id",
        title: 1,
        votes: {
          $size: "$votes",
        },
      },
    },

    {
      $sort: {
        votes: -1,
        title: 1,
      },
    },
  ]);

  const totalVotes = results.reduce((total, option) => total + option.votes, 0);

  const formattedResults = results.map((option) => ({
    ...option,
    percentage:
      totalVotes === 0
        ? 0
        : Number(((option.votes / totalVotes) * 100).toFixed(2)),
  }));

  const highestVotes =
    formattedResults.length > 0 ? formattedResults[0].votes : 0;

  const winners = formattedResults.filter(
    (option) => option.votes === highestVotes,
  );

  const hasVotes = totalVotes > 0;

  return {
    totalVotes,
    results: formattedResults,
    tie: hasVotes && winners.length > 1,
    winner: hasVotes && winners.length === 1 ? winners[0] : null,
    winners: hasVotes && winners.length > 1 ? winners : [],
  };
};

module.exports = {
  getPollResults,
};
