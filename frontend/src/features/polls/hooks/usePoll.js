import { useQuery } from "@tanstack/react-query";

import { getPolls } from "../api/polls.api";

export const usePoll = (pollId) => {
  return useQuery({
    queryKey: ["polls", "detail", pollId],

    queryFn: () => getPolls(pollId),

    enabled: Boolean(pollId),

    staleTime: 30_000,
  });
};
