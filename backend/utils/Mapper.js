const formatPollListItem = (poll) => ({
  id: poll._id.toString(),
  title: poll.title,
  description: poll.description,
  status: poll.status,
  startsAt: poll.startsAt,
  endsAt: poll.endsAt,
  createdAt: poll.createdAt,
});

const formatPollDetail = (poll) => ({
  id: poll._id.toString(),
  title: poll.title,
  description: poll.description,
  status: poll.status,
  startsAt: poll.startsAt,
  endsAt: poll.endsAt,
  createdAt: poll.createdAt,
  updatedAt: poll.updatedAt,
});

const formatPollOption = (option) => ({
  id: option._id.toString(),
  title: option.title,
  description: option.description,
});

const formatUser = (user) => ({
  id: user._id.toString(),
  username: user.username,
  email: user.email,
  roles: Object.values(user.roles),
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});
module.exports = {
  formatPollListItem,
  formatPollDetail,
  formatPollOption,
  formatUser,
};
