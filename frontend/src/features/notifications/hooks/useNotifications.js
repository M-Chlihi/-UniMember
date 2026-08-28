import { useQuery } from "@tanstack/react-query";

// import { notificationKeys } from "./queryKeys";
import { getNotifications } from "../api/notifications.api";
import { getNotificationSummary } from "../api/notifications.api";
import { getNotificationHistory } from "../api/notifications.api";

import { adminNotificationKeys } from "./queryKeys";
export const useNotifications = (params = {}) => {
  const query = useQuery({
    // queryKey: ["notifications", params],
    queryKey: [...adminNotificationKeys.all, "deliveries", params],
    queryFn: () => getNotifications(params),

    placeholderData: (previousData) => previousData,
  });

  return query;
};

export const useNotificationHistory = (params = {}) => {
  return useQuery({
    queryKey: adminNotificationKeys.history(params),

    queryFn: () => getNotificationHistory(params),

    placeholderData: (previousData) => previousData,
  });
};

export const useNotificationSummary = (params = {}) => {
  const req = useQuery({
    queryKey: adminNotificationKeys.summary(params),

    queryFn: () => getNotificationSummary(params),
  });
  console.log(req);
  return req;
};
