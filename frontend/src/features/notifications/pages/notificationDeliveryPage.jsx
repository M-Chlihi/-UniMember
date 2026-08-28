import { useMemo, useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import LoadingScreen from "../../../components/feedback/LoadingScreen";
import ErrorState from "../../../components/feedback/ErrorState";
import EmptyState from "../../../components/feedback/EmptyState";
import Button from "../../../components/ui/Button";

import NotificationSummaryCard from "../components/NotificationSummaryCard";
import NotificationDeliveryFilters from "../components/NotificationDeliveryFilters";
import NotificationTable from "../components/NotificationTable";

import { useNotificationSummary } from "../hooks/useNotifications";

import { useNotificationDetails } from "../hooks/useNotificationDetails";

export default function NotificationDeliveryPage() {
  const { pollId } = useParams();

  const navigate = useNavigate();

  const [status, setStatus] = useState("");

  const [recipient, setRecipient] = useState("");

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 350);

    return () => clearTimeout(timer);
  }, [search]);
  const summaryQuery = useNotificationSummary({
    pollId,
  });

  const params = useMemo(
    () => ({
      pollId,
      page,
      debouncedSearch,
      limit: 20,

      ...(status ? { status } : {}),

      ...(recipient
        ? {
            recipientEmail: recipient,
          }
        : {}),
    }),
    [pollId, page, status, , debouncedSearch, recipient],
  );

  const deliveriesQuery = useNotificationDetails(params);

  if (summaryQuery.isLoading || deliveriesQuery.isLoading) {
    return <LoadingScreen message="Loading notification delivery..." />;
  }

  const summary = summaryQuery.data?.data ?? {
    total: 0,
    sent: 0,
    pending: 0,
    processing: 0,
    failed: 0,
  };
  const deliveryRate =
    summary.total > 0 ? Math.round((summary.sent / summary.total) * 100) : 0;

  const deliveries = deliveriesQuery.data?.data ?? [];

  const pagination = deliveriesQuery.data?.pagination;
  // console.log(recipient);
  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <button
            type="button"
            onClick={() => navigate("/admin/notifications")}
            className="text-sm font-medium text-primary"
          >
            ← Notification history
          </button>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-text-primary">
            Notification delivery
          </h1>

          <p className="mt-2 text-text-secondary">
            Monitor delivery status for this poll-result announcement.
          </p>
        </div>

        <Button
          variant="secondary"
          onClick={() => {
            summaryQuery.refetch();
            deliveriesQuery.refetch();
          }}
          loading={summaryQuery.isFetching || deliveriesQuery.isFetching}
        >
          Refresh
        </Button>
      </header>

      {summaryQuery.isError && (
        <ErrorState
          title="Delivery summary unavailable"
          message={
            summaryQuery.error?.response?.data?.message ||
            "We couldn't load the delivery summary."
          }
          onRetry={summaryQuery.refetch}
        />
      )}

      {!summaryQuery.isError && (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <NotificationSummaryCard
            label="Delivery rate"
            value={`${deliveryRate}%`}
            description="Sent successfully"
          />
          <NotificationSummaryCard label="Recipients" value={summary.total} />

          <NotificationSummaryCard label="Sent" value={summary.sent} />

          <NotificationSummaryCard label="Pending" value={summary.pending} />

          <NotificationSummaryCard label="Failed" value={summary.failed} />
        </section>
      )}

      <NotificationDeliveryFilters
        status={status}
        recipient={recipient}
        onStatusChange={(value) => {
          setStatus(value);
          setPage(1);
        }}
        onRecipientChange={(value) => {
          setRecipient(value);
          setPage(1);
        }}
      />
      {deliveriesQuery.isError ? (
        <ErrorState
          title="Recipient deliveries unavailable"
          message={
            deliveriesQuery.error?.response?.data?.message ||
            "We couldn't load recipient deliveries."
          }
          onRetry={deliveriesQuery.refetch}
        />
      ) : !deliveries.length ? (
        <EmptyState
          title="No matching deliveries"
          message={
            status || recipient
              ? "No recipients match your current filters."
              : "No delivery records exist for this notification."
          }
        />
      ) : (
        <NotificationTable
          notifications={deliveries}
          pagination={pagination}
          page={page}
          onPageChange={setPage}
          isFetching={deliveriesQuery.isFetching}
        />
      )}
    </div>
  );
}
