import { useQuery } from "@tanstack/react-query";

import { getAdminPolls } from "../api/adminPolls.api";
import { adminPollKeys } from "./queryKeys";

export const useAdminPolls = (params = {}) => {
  return useQuery({
    queryKey: adminPollKeys.list(params),

    queryFn: () => getAdminPolls(params),

    placeholderData: (previousData) => previousData,
  });
};
