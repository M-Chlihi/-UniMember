import Card from "../../../components/ui/Card";

export default function NotificationHealthCard({ notifications = [] }) {
  const counts = {
    sent: notifications.filter((item) => item.status === "SENT").length,

    pending: notifications.filter((item) => item.status === "PENDING").length,

    processing: notifications.filter((item) => item.status === "PROCESSING")
      .length,

    failed: notifications.filter((item) => item.status === "FAILED").length,
  };

  return (
    <Card title="Notification health">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Metric label="Sent" value={counts.sent} />

        <Metric label="Pending" value={counts.pending} />

        <Metric label="Processing" value={counts.processing} />

        <Metric label="Failed" value={counts.failed} />
      </div>
    </Card>
  );
}

function Metric({ label, value }) {
  return (
    <div>
      <p className="text-sm text-text-muted">{label}</p>

      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}
