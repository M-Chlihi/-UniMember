import { useMutation, useQueryClient } from "@tanstack/react-query";

import { castVote } from "../api/voting.api";

import { votingKeys } from "./querykeys";

export const useCastVote = (pollId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (optionId) => castVote(pollId, optionId),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: votingKeys.myVote(pollId),
        }),

        queryClient.invalidateQueries({
          queryKey: ["votes", "my-vote", pollId],
        }),
      ]);
    },
  });
};
