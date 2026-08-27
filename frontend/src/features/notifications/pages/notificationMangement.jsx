import { useMemo, useState } from "react";

import LoadingScreen from "../../../components/feedback/LoadingScreen";
import ErrorState from "../../../components/feedback/ErrorState";
import EmptyState from "../../../components/feedback/EmptyState";

import Button from "../../../components/ui/Button";

import NotificationFilters from "../components/NotificationFilters";
import NotificationTable from "../components/NotificationTable";

import { useNotifications } from "../hooks/useNotifications";

export default function AdminNotificationsPage() {
  const [status, setStatus] = useState("");

  const [channel, setChannel] = useState("");

  const [page, setPage] = useState(1);

  const params = useMemo(
    () => ({
      page,
      limit: 10,
      sort: "-createdAt",

      ...(status ? { status } : {}),

      ...(channel ? { channel } : {}),
    }),
    [page, status, channel],
  );

  const { data, isLoading, isError, error, refetch, isFetching } =
    useNotifications(params);

  if (isLoading) {
    return <LoadingScreen message="Loading notification operations..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Notifications unavailable"
        message={
          error?.response?.data?.message ||
          "We couldn't load notification operations."
        }
        onRetry={refetch}
      />
    );
  }

  const notifications = data?.data ?? [];
  const pagination = data?.pagination;
  console.log(notifications);
  console.log(pagination);

  const resetFilters = () => {
    setStatus("");
    setChannel("");
    setPage(1);
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">Operations</p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            Notification operations
          </h1>

          <p className="mt-2 text-text-secondary">
            Monitor notification delivery and identify failed or pending
            messages.
          </p>
        </div>

        <Button variant="secondary" onClick={() => refetch()}>
          Refresh
        </Button>
      </header>

      <NotificationFilters
        status={status}
        channel={channel}
        onStatusChange={(value) => {
          setStatus(value);
          setPage(1);
        }}
        onChannelChange={(value) => {
          setChannel(value);
          setPage(1);
        }}
      />

      {(status || channel) && (
        <Button variant="ghost" size="sm" onClick={resetFilters}>
          Clear filters
        </Button>
      )}

      {!notifications.length ? (
        <EmptyState
          title="No notifications found"
          message={
            status || channel
              ? "No notifications match the selected filters."
              : "No notifications have been created yet."
          }
        />
      ) : (
        <NotificationTable
          notifications={notifications}
          pagination={pagination}
          page={page}
          onPageChange={setPage}
          isFetching={isFetching}
        />
      )}
    </div>
  );
}
