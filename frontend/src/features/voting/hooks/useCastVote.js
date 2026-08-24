import { useMutation, useQueryClient } from "@tanstack/react-query";

import { castVote } from "../api/voting.api";

export const useCastVote = (pollId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (optionId) => castVote(pollId, optionId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["votes", "my-vote", pollId],
      });

      queryClient.invalidateQueries({
        queryKey: ["polls", "active"],
      });
    },
  });
};
