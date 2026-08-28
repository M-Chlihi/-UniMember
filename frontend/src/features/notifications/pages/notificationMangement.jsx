import { useMemo, useState } from "react";

import LoadingScreen from "../../../components/feedback/LoadingScreen";
import ErrorState from "../../../components/feedback/ErrorState";
import EmptyState from "../../../components/feedback/EmptyState";
import Button from "../../../components/ui/Button";

import NotificationSummaryCard from "../components/NotificationSummaryCard";
import NotificationFilters from "../components/NotificationFilters";
import NotificationHistoryTable from "../components/NotificationHistoryTable";

import {
  useNotificationHistory,
  useNotificationSummary,
} from "../hooks/useNotifications";

export default function AdminNotificationsPage() {
  const [type, setType] = useState("");
  const [channel, setChannel] = useState("");
  const [page, setPage] = useState(1);

  const historyParams = useMemo(
    () => ({
      page,
      limit: 10,

      ...(type ? { type } : {}),

      ...(channel ? { channel } : {}),
    }),
    [page, type, channel],
  );

  const summaryParams = useMemo(
    () => ({
      ...(type ? { type } : {}),

      ...(channel ? { channel } : {}),
    }),
    [type, channel],
  );

  const historyQuery = useNotificationHistory(historyParams);

  const summaryQuery = useNotificationSummary(summaryParams);

  const resetFilters = () => {
    setType("");
    setChannel("");
    setPage(1);
  };

  const isInitialLoading = historyQuery.isLoading || summaryQuery.isLoading;

  if (isInitialLoading) {
    return <LoadingScreen message="Loading notification delivery history..." />;
  }

  /*
   * IMPORTANT:
   *
   * Summary and history are independent.
   * A failure in one should not destroy
   * the entire page.
   */

  const historyData = historyQuery.data;

  const summary = summaryQuery.data?.data ?? {
    total: 0,
    sent: 0,
    pending: 0,
    processing: 0,
    failed: 0,
    deliveryRate: 0,
  };
  console.log(summary);

  const campaigns = historyData?.data ?? [];

  const pagination = historyData?.pagination;

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">Operations</p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-text-primary">
            Notification delivery
          </h1>

          <p className="mt-2 max-w-2xl text-text-secondary">
            Monitor poll-result announcements sent to club members.
          </p>
        </div>

        <Button
          variant="secondary"
          onClick={() => {
            historyQuery.refetch();
            summaryQuery.refetch();
          }}
          loading={historyQuery.isFetching || summaryQuery.isFetching}
        >
          Refresh
        </Button>
      </header>

      {/* Summary error */}
      {summaryQuery.isError && (
        <ErrorState
          title="Delivery summary unavailable"
          message={
            summaryQuery.error?.response?.data?.message ||
            "We couldn't load delivery metrics."
          }
          onRetry={summaryQuery.refetch}
        />
      )}

      {/* Summary */}
      {!summaryQuery.isError && (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <NotificationSummaryCard
            label="Recipients"
            value={summary.total}
            description="Total targeted deliveries"
          />

          <NotificationSummaryCard
            label="Sent"
            value={summary.sent}
            description="Accepted by provider"
          />

          <NotificationSummaryCard
            label="Pending"
            value={summary.pending}
            description="Waiting for processing"
          />

          <NotificationSummaryCard
            label="Processing"
            value={summary.processing}
            description="Currently being handled"
          />

          <NotificationSummaryCard
            label="Failed"
            value={summary.failed}
            description="Delivery failures"
          />
        </section>
      )}

      {/* Filters */}
      <div className="space-y-3">
        <NotificationFilters
          type={type}
          channel={channel}
          onTypeChange={(value) => {
            setType(value);
            setPage(1);
          }}
          onChannelChange={(value) => {
            setChannel(value);
            setPage(1);
          }}
        />

        {(type || channel) && (
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            Clear filters
          </Button>
        )}
      </div>

      {/* History error */}
      {historyQuery.isError ? (
        <ErrorState
          title="Notification history unavailable"
          message={
            historyQuery.error?.response?.data?.message ||
            "We couldn't load notification history."
          }
          onRetry={historyQuery.refetch}
        />
      ) : !campaigns.length ? (
        <EmptyState
          title="No notification broadcasts found"
          message={
            type || channel
              ? "No broadcasts match your current filters."
              : "No poll-result notification broadcasts have been created yet."
          }
        />
      ) : (
        <NotificationHistoryTable
          campaigns={campaigns}
          pagination={pagination}
          page={page}
          onPageChange={setPage}
          isFetching={historyQuery.isFetching}
        />
      )}
    </div>
  );
}
