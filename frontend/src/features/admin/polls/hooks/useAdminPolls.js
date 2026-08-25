import { useQuery } from "@tanstack/react-query";

import { getPolls } from "../../../polls/api/polls.api";
import { adminPollKeys } from "./queryKeys";

export const useAdminPolls = (params = {}) => {
  return useQuery({
    queryKey: adminPollKeys.list(params),

    queryFn: () => getPolls(params),

    placeholderData: (previousData) => previousData,
  });
};
