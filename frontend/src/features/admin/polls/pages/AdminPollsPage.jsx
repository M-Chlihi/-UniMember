import { useMemo, useState } from "react";

import EmptyState from "../../../../components/feedback/EmptyState";
import ErrorState from "../../../../components/feedback/ErrorState";
import LoadingScreen from "../../../../components/feedback/LoadingScreen";

import PollFilters from "../components/PollFilters";
import PollManagementTable from "../components/PollManagementTable";

import Button from "../../../../components/ui/Button";

import { useAdminPolls } from "../hooks/useAdminPolls";

export default function AdminPollsPage() {
  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);

  const limit = 10;

  const params = useMemo(
    () => ({
      ...(status ? { status } : {}),
      page,
      limit,
      sort: "-createdAt",
    }),
    [status, page],
  );

  const { data, isLoading, isError, error, refetch, isFetching } =
    useAdminPolls(params);

  if (isLoading) {
    return <LoadingScreen message="Loading polls..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Polls unavailable"
        message={
          error?.response?.data?.message || "We couldn't load the polls."
        }
        onRetry={refetch}
      />
    );
  }

  const polls = data?.data ?? [];
  const pagination = data?.pagination;

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">Administration</p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            Poll management
          </h1>

          <p className="mt-2 text-text-secondary">
            Create, schedule, publish, and manage club polls.
          </p>
        </div>

        <Button onClick={() => window.location.assign("/admin/polls/create")}>
          Create poll
        </Button>
      </header>

      <PollFilters
        status={status}
        onStatusChange={(value) => {
          setStatus(value);
          setPage(1);
        }}
      />

      {!polls.length ? (
        <EmptyState
          title="No polls found"
          message={
            status
              ? `There are no ${status.toLowerCase()} polls.`
              : "Create your first poll to get started."
          }
          action={
            !status ? (
              <Button
                onClick={() => window.location.assign("/admin/polls/create")}
              >
                Create poll
              </Button>
            ) : null
          }
        />
      ) : (
        <PollManagementTable
          polls={polls}
          pagination={pagination}
          page={page}
          onPageChange={setPage}
          isFetching={isFetching}
        />
      )}
    </div>
  );
}
