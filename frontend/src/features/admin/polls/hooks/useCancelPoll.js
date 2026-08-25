import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cancelPoll } from "../api/adminPolls.api";

import { adminPollKeys } from "./queryKeys";

export const useCancelPoll = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelPoll,

    onSuccess: (data, pollId) => {
      queryClient.invalidateQueries({
        queryKey: adminPollKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: adminPollKeys.detail(pollId),
      });

      queryClient.invalidateQueries({
        queryKey: ["polls", "active"],
      });
    },
  });
};
