import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateUserRoles } from "../api/users.api";

import { userKeys } from "./queryKeys";

export const useUpdateUserRoles = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserRoles,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: userKeys.all,
      });
    },
  });
};
