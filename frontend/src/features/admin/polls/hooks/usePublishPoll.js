import { useMutation, useQueryClient } from "@tanstack/react-query";

import { publishPoll } from "../api/adminPolls.api";

import { adminPollKeys } from "./queryKeys";

export const usePublishPoll = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: publishPoll,

    onSuccess: (_data, pollId) => {
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
