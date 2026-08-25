import { useQuery } from "@tanstack/react-query";

// import { notificationKeys } from "./queryKeys";
import { getNotifications } from "../api/notifications.api";

export const useNotifications = (params = {}) => {
  const query = useQuery({
    queryKey: ["notifications", params],

    queryFn: () => getNotifications(params),

    placeholderData: (previousData) => previousData,
  });
  console.log("NOTIFICATION QUERY:", {
    data: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
  });
  return query;
};
