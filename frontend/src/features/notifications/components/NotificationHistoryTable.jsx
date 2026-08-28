import { useNavigate } from "react-router-dom";

import Button from "../../../components/ui/Button";

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

export default function NotificationHistoryTable({
  campaigns,
  pagination,
  page,
  onPageChange,
  isFetching,
}) {
  const navigate = useNavigate();

  return (
    <section className="overflow-hidden rounded-lg border border-border bg-surface">
      {/* Desktop */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left">
          <thead className="border-b border-border bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-text-primary">
                Poll
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-text-primary">
                Type
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-text-primary">
                Channel
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-text-primary">
                Recipients
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-text-primary">
                Sent
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-text-primary">
                Pending
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-text-primary">
                Failed
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-text-primary">
                Created
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-text-primary">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {campaigns.map((campaign) => (
              <tr
                key={`${campaign.pollId}-${campaign.type}-${campaign.channel}`}
                className="transition hover:bg-slate-50"
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-text-primary">
                      {campaign.pollTitle ?? "Poll unavailable"}
                    </p>
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-text-secondary">
                  {campaign.type}
                </td>

                <td className="px-6 py-4 text-sm text-text-secondary">
                  {campaign.channel}
                </td>

                <td className="px-6 py-4 text-sm font-medium text-text-primary">
                  {campaign.total}
                </td>

                <td className="px-6 py-4 text-sm font-medium text-success">
                  {campaign.sent}
                </td>

                <td className="px-6 py-4 text-sm text-text-secondary">
                  {campaign.pending}
                </td>

                <td className="px-6 py-4 text-sm font-medium text-danger">
                  {campaign.failed}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-sm text-text-secondary">
                  {formatDateTime(campaign.createdAt)}
                </td>

                <td className="px-6 py-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      navigate(`/admin/notifications/${campaign.pollId}`)
                    }
                  >
                    View delivery
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="grid gap-3 p-4 md:hidden">
        {campaigns.map((campaign) => (
          <article
            key={`${campaign.pollId}-${campaign.type}-${campaign.channel}`}
            className="rounded-lg border border-border p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 className="truncate font-semibold text-text-primary">
                  {campaign.pollTitle ?? "Poll unavailable"}
                </h2>

                <p className="mt-1 text-xs text-text-muted">{campaign.type}</p>
              </div>

              <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-text-secondary">
                {campaign.channel}
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-text-muted">Recipients</p>

                <p className="mt-1 font-semibold text-text-primary">
                  {campaign.total}
                </p>
              </div>

              <div>
                <p className="text-xs text-text-muted">Sent</p>

                <p className="mt-1 font-semibold text-success">
                  {campaign.sent}
                </p>
              </div>

              <div>
                <p className="text-xs text-text-muted">Pending</p>

                <p className="mt-1 font-semibold text-text-primary">
                  {campaign.pending}
                </p>
              </div>

              <div>
                <p className="text-xs text-text-muted">Failed</p>

                <p className="mt-1 font-semibold text-danger">
                  {campaign.failed}
                </p>
              </div>
            </div>

            <p className="mt-4 text-xs text-text-muted">
              {formatDateTime(campaign.createdAt)}
            </p>

            <div className="mt-4">
              <Button
                fullWidth
                variant="secondary"
                size="sm"
                onClick={() =>
                  navigate(`/admin/notifications/${campaign.pollId}`)
                }
              >
                View delivery
              </Button>
            </div>
          </article>
        ))}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="flex flex-col gap-3 border-t border-border p-4 sm:flex-row sm:items-center sm:justify-between">
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
