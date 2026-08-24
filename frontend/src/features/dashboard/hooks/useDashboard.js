import { useActivePoll } from "../../polls/hooks/useActivePoll";

export const useDashboard = () => {
  const activePollQuery = useActivePoll();
  return {
    activePoll: activePollQuery.data?.data ?? null,

    isLoading: activePollQuery.isLoading,
    isFetching: activePollQuery.isFetching,
    isError: activePollQuery.isError,
    error: activePollQuery.error,
    refetch: activePollQuery.refetch,
  };
};
