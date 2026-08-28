import { useQuery } from "@tanstack/react-query";

import { getNotifications } from "../api/notifications.api";

export const useNotificationDetails = ({
  pollId,
  status,
  page,
  limit = 20,
}) => {
  const params = {
    pollId,
    page,
    limit,

    ...(status ? { status } : {}),
  };

  return useQuery({
    queryKey: ["admin", "notifications", "details", params],

    queryFn: () => getNotifications(params),

    enabled: Boolean(pollId),

    placeholderData: (previousData) => previousData,
  });
};
