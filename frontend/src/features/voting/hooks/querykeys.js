export const votingKeys = {
  all: ["votes"],

  myVote: (pollId) => [...votingKeys.all, "my-vote", pollId],

  history: (params) => [...votingKeys.all, "history", params],
};
