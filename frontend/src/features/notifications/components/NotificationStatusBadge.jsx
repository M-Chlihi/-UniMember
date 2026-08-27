import Badge from "../../../components/ui/Badge";

const statusVariant = {
  PENDING: "info",
  PROCESSING: "warning",
  SENT: "success",
  FAILED: "danger",
};

export default function NotificationStatusBadge({ status }) {
  return <Badge variant={statusVariant[status] ?? "default"}>{status}</Badge>;
}
