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

const Vote = require("../models/Vote");

const getVotingHistory = async ({
  userId,
  page = 1,
  limit = 10,
  sort = "-createdAt",
}) => {
  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const skip = (pageNumber - 1) * limitNumber;

  const sortDirection = sort === "-createdAt" ? -1 : 1;

  const [votes, total] = await Promise.all([
    Vote.find({
      userId,
    })
      .select("_id pollId optionId createdAt")
      .populate({
        path: "pollId",
        select: "_id title description status startsAt endsAt",
      })
      .populate({
        path: "optionId",
        select: "_id title description",
      })
      .sort({
        createdAt: sortDirection,
      })
      .skip(skip)
      .limit(limitNumber)
      .lean(),

    Vote.countDocuments({
      userId,
    }),
  ]);

  const totalPages = Math.ceil(total / limitNumber);

  return {
    data: votes.map((vote) => ({
      poll: {
        id: vote.pollId._id.toString(),
        title: vote.pollId.title,
        description: vote.pollId.description,
        status: vote.pollId.status,
        startsAt: vote.pollId.startsAt,
        endsAt: vote.pollId.endsAt,
      },

      myVote: {
        optionId: vote.optionId._id.toString(),
        optionTitle: vote.optionId.title,
        votedAt: vote.createdAt,
      },
    })),

    pagination: {
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages,
      hasNextPage: pageNumber < totalPages,
      hasPreviousPage: pageNumber > 1,
    },
  };
};

module.exports = {
  getPollResults,
  getVotingHistory,
};
