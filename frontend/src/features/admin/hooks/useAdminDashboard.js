import { usePoll } from "../../polls/hooks/usePoll";
import { useActivePoll } from "../../polls/hooks/useActivePoll";
import { useNotifications } from "../../notifications/hooks/useNotifications";

export const useAdminDashboard = () => {
  const pollsQuery = usePoll({
    page: 1,
    limit: 50,
    sort: "-createdAt",
  });

  const activePollQuery = useActivePoll();

  const notificationsQuery = useNotifications({
    page: 1,
    limit: 50,
    sort: "-createdAt",
  });

  return {
    polls: pollsQuery.data,
    activePoll: activePollQuery.data?.data,
    notifications: notificationsQuery.data,

    isLoading:
      pollsQuery.isLoading ||
      activePollQuery.isLoading ||
      notificationsQuery.isLoading,

    isError:
      pollsQuery.isError ||
      activePollQuery.isError ||
      notificationsQuery.isError,

    refetch: async () => {
      await Promise.all([
        pollsQuery.refetch(),
        activePollQuery.refetch(),
        notificationsQuery.refetch(),
      ]);
    },
  };
};
