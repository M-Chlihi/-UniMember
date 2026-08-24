import { useQuery } from "@tanstack/react-query";

import { getPollHistory } from "../../polls/api/polls.api";

export const useVotingHistory = (params) => {
  return useQuery({
    queryKey: ["polls", "history", params],

    queryFn: () => getPollHistory(params),

    placeholderData: (previousData) => previousData,
  });
};
