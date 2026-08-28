import Card from "../../../components/ui/Card";

export default function NotificationSummaryCard({ label, value, description }) {
  return (
    <Card>
      <p className="text-sm font-medium text-text-secondary">{label}</p>

      <p className="mt-2 text-3xl font-bold text-text-primary">{value}</p>

      {description && (
        <p className="mt-1 text-sm text-text-muted">{description}</p>
      )}
    </Card>
  );
}
