const Poll = require("../models/Poll");
const {
  formatPollListItem,
  formatPollOption,
  formatPollDetail,
} = require("../utils/Mapper");
const listPolls = async ({
  status,
  sort = "-createdAt",
  page = 1,
  limit = 5,
}) => {
  const query = {};

  if (status) {
    query.status = status;
  }

  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const skip = (pageNumber - 1) * limitNumber;

  const sortField = sort.startsWith("-") ? sort.slice(1) : sort;

  const sortDirection = sort.startsWith("-") ? -1 : 1;

  const sortQuery = {
    [sortField]: sortDirection,
  };

  const [polls, total] = await Promise.all([
    Poll.find(query)
      .select("_id title description status startsAt endsAt createdAt")
      .sort(sortQuery)
      .skip(skip)
      .limit(limitNumber)
      .lean(),

    Poll.countDocuments(query),
  ]);

  const totalPages = Math.ceil(total / limitNumber);

  return {
    data: polls.map(formatPollListItem),

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

const PollOption = require("../models/PollOption");

const getPollByIdservice = async (pollId) => {
  const poll = await Poll.findById(pollId)
    .select(
      "_id title description status startsAt endsAt createdAt updatedAt createdBy",
    )
    .lean();

  if (!poll) {
    const error = new Error("Poll not found");
    error.status = 404;
    throw error;
  }

  const options = await PollOption.find({
    pollId: poll._id,
  })
    .select("_id title description")
    .sort({ createdAt: 1 })
    .lean();

  return {
    ...formatPollDetail(poll),
    options: options.map(formatPollOption),
  };
};
module.exports = { listPolls, getPollByIdservice };
