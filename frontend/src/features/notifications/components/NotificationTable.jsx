import NotificationRow from "./NotificationRow";
import Button from "../../../components/ui/Button";

export default function NotificationTable({
  notifications,
  pagination,
  page,
  onPageChange,
  isFetching,
}) {
  return (
    <section className="overflow-hidden rounded-lg border border-border bg-surface">
      {/* Desktop */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left">
          <thead className="border-b border-border bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold">Recipient</th>

              <th className="px-6 py-4 text-sm font-semibold">Type</th>

              <th className="px-6 py-4 text-sm font-semibold">Channel</th>

              <th className="px-6 py-4 text-sm font-semibold">Status</th>

              <th className="px-6 py-4 text-sm font-semibold">Attempts</th>

              <th className="px-6 py-4 text-sm font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {notifications.map((notification) => (
              <NotificationRow
                key={notification.id}
                notification={notification}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="grid gap-3 p-4 md:hidden">
        {notifications.map((notification) => (
          <article
            key={notification.id}
            className="rounded-lg border border-border p-4"
          >
            <NotificationRow notification={notification} mobile />
          </article>
        ))}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-border p-4">
          <p className="text-sm text-text-secondary">
            Page {pagination.page} of {pagination.totalPages}
          </p>

          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              disabled={!pagination.hasPreviousPage || isFetching}
              onClick={() => onPageChange(page - 1)}
            >
              Previous
            </Button>

            <Button
              variant="secondary"
              size="sm"
              disabled={!pagination.hasNextPage || isFetching}
              onClick={() => onPageChange(page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
