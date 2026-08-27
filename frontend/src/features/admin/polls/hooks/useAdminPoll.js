import { useQuery } from "@tanstack/react-query";

import { getAdminPoll } from "../api/adminPolls.api";
import { adminPollKeys } from "./queryKeys";

export const useAdminPoll = (pollId) => {
  return useQuery({
    queryKey: adminPollKeys.detail(pollId),

    queryFn: () => getAdminPoll(pollId),

    enabled: Boolean(pollId),
    refetchInterval: (query) => {
      const status = query.state.data?.data?.status;

      if (status === "OPEN" || status === "SCHEDULED") {
        return 10_000;
      }

      return false;
    },
  });
};
