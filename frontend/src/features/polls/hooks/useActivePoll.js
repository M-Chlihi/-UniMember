import { useQuery } from "@tanstack/react-query";

import { getActivePoll } from "../api/polls.api";

export const activePollQueryKey = ["polls", "active"];

export const useActivePoll = () => {
  return useQuery({
    queryKey: activePollQueryKey,

    queryFn: async () => {
      try {
        const response = await getActivePoll();
        return response.data;
      } catch (error) {
        if (error?.response?.status === 404) {
          return null;
        }

        throw error;
      }
    },

    staleTime: 30_000,

    retry: (failureCount, error) => {
      if (error?.response?.status === 404) {
        return false;
      }

      return failureCount < 1;
    },

    refetchOnWindowFocus: true,

    refetchIntervalInBackground: false,
  });
};
