import { useQuery } from "@tanstack/react-query";

import { getMyVote } from "../api/voting.api";
import { votingKeys } from "./querykeys";

export const useMyVote = (pollId) => {
  return useQuery({
    queryKey: votingKeys.myVote(pollId),

    queryFn: () => getMyVote(pollId),

    enabled: Boolean(pollId),

    staleTime: 0,

    refetchOnMount: "always",

    refetchOnWindowFocus: true,
  });
};
