import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updatePoll } from "../api/adminPolls.api";

import { adminPollKeys } from "./queryKeys";

export const useUpdatePoll = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ pollId, payload }) => updatePoll(pollId, payload),

    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: adminPollKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: adminPollKeys.detail(variables.pollId),
      });
    },
  });
};
