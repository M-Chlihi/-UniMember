import { useQuery } from "@tanstack/react-query";

import { getNotifications } from "../api/notifications.api";

export const useNotifications = (params) => {
  return useQuery({
    queryKey: ["notifications", params],

    queryFn: () => getNotifications(params),

    placeholderData: (previousData) => previousData,
  });
};
