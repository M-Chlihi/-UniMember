import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteDraftPoll } from "../api/adminPolls.api";

import { adminPollKeys } from "./queryKeys";

export const useDeleteDraftPoll = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDraftPoll,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminPollKeys.lists(),
      });
    },
  });
};
