import { useQuery } from "@tanstack/react-query";

import { getUsers } from "../api/users.api";

import { userKeys } from "./queryKeys";

export const useUsers = (params = {}) => {
  return useQuery({
    queryKey: userKeys.list(params),

    queryFn: () => getUsers(params),

    placeholderData: (previousData) => previousData,

    staleTime: 30_000,

    refetchOnWindowFocus: true,
  });
};
