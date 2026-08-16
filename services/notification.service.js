const notifyPollClosed = async ({ poll, results }) => {
  const winner = results.winner;

  if (!winner) {
    console.log(`Poll ${poll._id} closed without a unique winner`);

    return;
  }

  console.log(`Poll "${poll.title}" winner: ${winner.title}`);
};

module.exports = {
  notifyPollClosed,
};
