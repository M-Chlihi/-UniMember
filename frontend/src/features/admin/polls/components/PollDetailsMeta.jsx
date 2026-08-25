import Card from "../../../../components/ui/Card";

const formatDateTime = (value) =>
  value
    ? new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(value))
    : "—";

export default function PollDetailsMeta({ poll }) {
  return (
    <Card title="Poll information">
      <dl className="grid gap-6 sm:grid-cols-2">
        <div>
          <dt className="text-sm text-text-muted">Status</dt>

          <dd className="mt-1 font-medium">{poll.status}</dd>
        </div>

        <div>
          <dt className="text-sm text-text-muted">Created</dt>

          <dd className="mt-1 font-medium">{formatDateTime(poll.createdAt)}</dd>
        </div>

        <div>
          <dt className="text-sm text-text-muted">Starts</dt>

          <dd className="mt-1 font-medium">{formatDateTime(poll.startsAt)}</dd>
        </div>

        <div>
          <dt className="text-sm text-text-muted">Ends</dt>

          <dd className="mt-1 font-medium">{formatDateTime(poll.endsAt)}</dd>
        </div>
      </dl>
    </Card>
  );
}
