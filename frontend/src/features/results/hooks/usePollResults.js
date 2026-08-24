import { useQuery } from "@tanstack/react-query";

import { getPollResults } from "../api/results.api";

export const usePollResults = (pollId) => {
  return useQuery({
    queryKey: ["polls", "results", pollId],

    queryFn: () => getPollResults(pollId),

    enabled: Boolean(pollId),

    staleTime: 60_000,
  });
};
