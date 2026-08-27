import { useQuery } from "@tanstack/react-query";

import { getActivePoll } from "../api/polls.api";

export const activePollQueryKey = ["polls", "active"];

export const useActivePoll = () => {
  return useQuery({
    queryKey: activePollQueryKey,

    queryFn: getActivePoll,

    staleTime: 30_000,

    retry: 1,
    refetchIntervalInBackground: false,
  });
};
