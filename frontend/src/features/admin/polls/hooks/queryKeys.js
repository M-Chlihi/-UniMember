export const adminPollKeys = {
  all: ["admin", "polls"],

  lists: () => [...adminPollKeys.all, "list"],

  list: (params) => [...adminPollKeys.lists(), params],

  details: () => [...adminPollKeys.all, "detail"],

  detail: (pollId) => [...adminPollKeys.details(), pollId],
};
