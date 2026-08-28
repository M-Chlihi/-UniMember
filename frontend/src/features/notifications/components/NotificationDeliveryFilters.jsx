export default function NotificationDeliveryFilters({
  status,
  onStatusChange,
  recipient,
  onRecipientChange,
}) {
  return (
    <section className="rounded-lg border border-border bg-surface p-4">
      <div className="grid gap-4 md:grid-cols-[200px_1fr]">
        <div>
          <label
            htmlFor="delivery-status"
            className="block text-sm font-medium text-text-primary"
          >
            Status
          </label>

          <select
            id="delivery-status"
            value={status}
            onChange={(event) => onStatusChange(event.target.value)}
            className="mt-2 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm"
          >
            <option value="">All</option>

            <option value="PENDING">Pending</option>

            <option value="PROCESSING">Processing</option>

            <option value="SENT">Sent</option>

            <option value="FAILED">Failed</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="recipient-search"
            className="block text-sm font-medium text-text-primary"
          >
            Search recipient
          </label>

          <input
            id="recipient-search"
            type="search"
            value={recipient}
            onChange={(event) => onRecipientChange(event.target.value)}
            placeholder="member@example.com"
            className="mt-2 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
    </section>
  );
}
