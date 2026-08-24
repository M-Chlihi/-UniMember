import { useQuery } from "@tanstack/react-query";

import { getMyVote } from "../api/voting.api";

export const useMyVote = (pollId) => {
  return useQuery({
    queryKey: ["votes", "my-vote", pollId],

    queryFn: () => getMyVote(pollId),

    enabled: Boolean(pollId),

    staleTime: 30_000,
  });
};
