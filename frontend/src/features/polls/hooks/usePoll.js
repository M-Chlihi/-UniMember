import { useQuery } from "@tanstack/react-query";

import { getPolls, getPoll } from "../api/polls.api";

export const usePoll = (pollId) => {
  return useQuery({
    queryKey: ["polls", "detail", pollId],

    queryFn: () => getPolls(pollId),

    enabled: Boolean(pollId),

    staleTime: 30_000,
  });
};
export const usePollforResults = (pollId) => {
  return useQuery({
    queryKey: ["polls", "detail", pollId],

    queryFn: () => getPoll(pollId),

    enabled: Boolean(pollId),

    staleTime: 30_000,
  });
};
