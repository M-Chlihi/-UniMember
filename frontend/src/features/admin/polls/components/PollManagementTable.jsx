import Badge from "../../../../components/ui/Badge";
import PollManagementRow from "./PollManagementRow";
import Button from "../../../../components/ui/Button";

const statusVariant = {
  DRAFT: "default",
  SCHEDULED: "info",
  OPEN: "success",
  CLOSED: "default",
  CANCELLED: "danger",
};

export default function PollManagementTable({
  polls,
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
              <th className="px-6 py-4 text-sm font-semibold">Poll</th>

              <th className="px-6 py-4 text-sm font-semibold">Status</th>

              <th className="px-6 py-4 text-sm font-semibold">Starts</th>

              <th className="px-6 py-4 text-sm font-semibold">Ends</th>

              <th className="px-6 py-4 text-sm font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {polls.map((poll) => (
              <PollManagementRow key={poll.id} poll={poll} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 p-4 md:hidden">
        {polls.map((poll) => (
          <div key={poll.id} className="rounded-lg border border-border p-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-semibold">{poll.title}</h2>

              <Badge variant={statusVariant[poll.status] ?? "default"}>
                {poll.status}
              </Badge>
            </div>

            <div className="mt-3 text-sm text-text-secondary">
              {poll.startsAt && new Date(poll.startsAt).toLocaleString()}

              {" → "}

              {poll.endsAt && new Date(poll.endsAt).toLocaleString()}
            </div>

            <div className="mt-4">
              <PollManagementRow poll={poll} mobile />
            </div>
          </div>
        ))}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-border p-4">
          <span className="text-sm text-text-secondary">
            Page {page} of {pagination.totalPages}
          </span>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              disabled={!pagination.hasPreviousPage || isFetching}
              onClick={() => onPageChange(page - 1)}
            >
              Previous
            </Button>

            <Button
              size="sm"
              variant="secondary"
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
