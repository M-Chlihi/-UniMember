import { useQuery } from "@tanstack/react-query";

// import { notificationKeys } from "./queryKeys";
import { getNotifications } from "../api/notifications.api";

import { adminNotificationKeys } from "./queryKeys";
export const useNotifications = (params = {}) => {
  const query = useQuery({
    // queryKey: ["notifications", params],
    queryKey: adminNotificationKeys.list(params),
    queryFn: () => getNotifications(params),

    placeholderData: (previousData) => previousData,
  });

  return query;
};
