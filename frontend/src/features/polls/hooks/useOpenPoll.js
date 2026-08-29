import { useQuery } from "@tanstack/react-query";

import { getOpenPolls } from "../api/polls.api";

export const openPollsQueryKey = ["polls", "open"];

export const useOpenPolls = () => {
  return useQuery({
    queryKey: openPollsQueryKey,

    queryFn: async () => {
      const response = await getOpenPolls();

      return response.data;
    },

    staleTime: 30_000,

    refetchOnWindowFocus: true,

    retry: 1,
  });
};
