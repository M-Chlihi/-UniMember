export default function NotificationFilters({
  channel,
  type,
  onChannelChange,
  onTypeChange,
}) {
  return (
    <div className="flex flex-wrap gap-4 rounded-lg border border-border bg-surface p-4">
      <div>
        <label
          htmlFor="notification-type"
          className="block text-sm font-medium"
        >
          Type
        </label>

        <select
          id="notification-type"
          value={type}
          onChange={(event) => onTypeChange(event.target.value)}
          className="mt-2 rounded-md border border-border bg-surface px-3 py-2 text-sm"
        >
          <option value="">All types</option>

          <option value="POLL_RESULT">Poll result</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="notification-channel"
          className="block text-sm font-medium"
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
