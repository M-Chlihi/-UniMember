export default function NotificationFilters({
  status,
  channel,
  onStatusChange,
  onChannelChange,
}) {
  return (
    <div className="flex flex-wrap gap-4 rounded-lg border border-border bg-surface p-4">
      <div>
        <label
          htmlFor="notification-status"
          className="block text-sm font-medium text-text-primary"
        >
          Status
        </label>

        <select
          id="notification-status"
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
          className="mt-2 rounded-md border border-border bg-surface px-3 py-2 text-sm"
        >
          <option value="">All statuses</option>

          <option value="PENDING">Pending</option>

          <option value="PROCESSING">Processing</option>

          <option value="SENT">Sent</option>

          <option value="FAILED">Failed</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="notification-channel"
          className="block text-sm font-medium text-text-primary"
        >
          Channel
        </label>

        <select
          id="notification-channel"
          value={channel}
          onChange={(event) => onChannelChange(event.target.value)}
          className="mt-2 rounded-md border border-border bg-surface px-3 py-2 text-sm"
        >
          <option value="">All channels</option>

          <option value="EMAIL">Email</option>
        </select>
      </div>
    </div>
  );
}
