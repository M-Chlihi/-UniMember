import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";

export default function AdminStatCard({
  label,
  value,
  description,
  variant = "default",
}) {
  return (
    <Card>
      <div className="space-y-3">
        <p className="text-sm font-medium text-text-secondary">{label}</p>

        <p className="text-3xl font-bold text-text-primary">{value}</p>

        {description && <Badge variant={variant}>{description}</Badge>}
      </div>
    </Card>
  );
}
