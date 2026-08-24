import { useState } from "react";

import { useVotingHistory } from "../hooks/useVoteHistory";

import LoadingScreen from "../../../components/feedback/LoadingScreen";
import ErrorState from "../../../components/feedback/ErrorState";
import EmptyState from "../../../components/feedback/EmptyState";
import VotingHistoryList from "../components/VotingHistoryList";
import HistoryPagination from "../components/HistoryPagination";

export default function VotingHistoryPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error, refetch, isFetching } =
    useVotingHistory({
      page,
      limit: 10,
      sort: "-createdAt",
    });

  if (isLoading) {
    return <LoadingScreen message="Loading your voting history..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="History unavailable"
        message={error?.message || "We couldn't load your voting history."}
        onRetry={refetch}
      />
    );
  }

  const items = data.data?.data ?? [];
  const pagination = data.data?.pagination;

  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm font-medium text-primary">My activity</p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          Voting history
        </h1>

        <p className="mt-2 text-text-secondary">
          Review the polls you participated in and the choices you made.
        </p>
      </header>

      {!items.length ? (
        <EmptyState
          title="No voting history yet"
          message="Once you participate in a course poll, your voting activity will appear here."
        />
      ) : (
        <>
          <VotingHistoryList items={items} />

          <HistoryPagination
            pagination={pagination}
            isFetching={isFetching}
            onPrevious={() => setPage((current) => Math.max(1, current - 1))}
            onNext={() => setPage((current) => current + 1)}
          />
        </>
      )}
    </div>
  );
}
