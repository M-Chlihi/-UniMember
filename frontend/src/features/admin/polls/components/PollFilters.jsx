export default function PollFilters({ status, onStatusChange }) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-surface p-4">
      <label htmlFor="poll-status" className="text-sm font-medium">
        Status
      </label>

      <select
        id="poll-status"
        value={status}
        onChange={(event) => onStatusChange(event.target.value)}
        className="rounded-md border border-border bg-surface px-3 py-2 text-sm"
      >
        <option value="">All statuses</option>

        <option value="DRAFT">Draft</option>

        <option value="SCHEDULED">Scheduled</option>

        <option value="OPEN">Open</option>

        <option value="CLOSED">Closed</option>

        <option value="CANCELLED">Cancelled</option>
      </select>
    </div>
  );
}
