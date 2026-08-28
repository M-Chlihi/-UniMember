import NotificationStatusBadge from "./NotificationStatusBadge";

const formatDateTime = (value) => {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

export default function NotificationTable({
  notifications,
  pagination,
  page,
  onPageChange,
  isFetching,
}) {
  return (
    <section className="overflow-hidden rounded-lg border border-border bg-surface">
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left">
          <thead className="border-b border-border bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold">Recipient</th>

              <th className="px-6 py-4 text-sm font-semibold">Status</th>

              <th className="px-6 py-4 text-sm font-semibold">Attempts</th>

              <th className="px-6 py-4 text-sm font-semibold">Last activity</th>

              <th className="px-6 py-4 text-sm font-semibold">Error</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {notifications.map((notification) => (
              <tr key={notification.id}>
                <td className="px-6 py-4 text-sm">
                  {notification.recipientEmail ??
                    notification.recipient?.email ??
                    "Unknown recipient"}
                </td>

                <td className="px-6 py-4">
                  <NotificationStatusBadge status={notification.status} />
                </td>

                <td className="px-6 py-4 text-sm">{notification.attempts}</td>

                <td className="px-6 py-4 text-sm text-text-secondary">
                  {formatDateTime(
                    notification.sentAt ??
                      notification.lastAttemptAt ??
                      notification.processingStartedAt ??
                      notification.createdAt,
                  )}
                </td>

                <td className="max-w-xs px-6 py-4 text-sm">
                  {notification.status === "FAILED" && notification.error ? (
                    <span
                      className="block truncate text-danger"
                      title={notification.error}
                    >
                      {notification.error}
                    </span>
                  ) : (
                    <span className="text-text-muted">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="divide-y divide-border md:hidden">
        {notifications.map((notification) => (
          <article key={notification.id} className="space-y-4 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="break-all font-medium text-text-primary">
                  {notification.recipient.email ??
                    notification.recipient?.email ??
                    "Unknown recipient"}
                </p>

                <p className="mt-1 text-xs text-text-muted">
                  {notification.type} · {notification.channel}
                </p>
              </div>

              <NotificationStatusBadge status={notification.status} />
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-text-muted">Attempts</p>

                <p className="mt-1 font-medium">{notification.attempts}</p>
              </div>

              <div>
                <p className="text-xs text-text-muted">Last activity</p>

                <p className="mt-1">
                  {formatDateTime(
                    notification.sentAt ??
                      notification.lastAttemptAt ??
                      notification.processingStartedAt ??
                      notification.createdAt,
                  )}
                </p>
              </div>
            </div>

            {notification.status === "FAILED" && notification.error && (
              <div>
                <p className="text-xs text-text-muted">Failure reason</p>

                <p className="mt-1 text-sm text-danger">{notification.error}</p>
              </div>
            )}
          </article>
        ))}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="flex flex-col gap-3 border-t border-border p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-text-secondary">
            Page {pagination.page} of {pagination.totalPages}
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              disabled={!pagination.hasPreviousPage || isFetching}
              onClick={() => onPageChange(page - 1)}
              className="rounded-md border border-border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            <button
              type="button"
              disabled={!pagination.hasNextPage || isFetching}
              onClick={() => onPageChange(page + 1)}
              className="rounded-md border border-border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
