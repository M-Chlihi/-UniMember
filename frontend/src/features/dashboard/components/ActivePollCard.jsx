import { useNavigate } from "react-router-dom";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";

const statusVariant = {
  OPEN: "success",
  SCHEDULED: "info",
  CLOSED: "default",
  CANCELLED: "danger",
  DRAFT: "default",
};

export default function ActivePollCard({ poll }) {
  const navigate = useNavigate();

  const action =
    poll.status === "OPEN"
      ? {
          label: "Vote now",
          path: `/member/poll/${poll.id}`,
        }
      : poll.status === "CLOSED"
        ? {
            label: "View results",
            path: `/member/poll/${poll.id}/results`,
          }
        : null;
  const variant = statusVariant[poll.status] ?? "default";

  return (
    <Card>
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <Badge variant={variant}>{poll.status}</Badge>

          <span className="text-sm text-text-muted">
            {poll.endsAt
              ? `Ends ${new Date(poll.endsAt).toLocaleString()}`
              : null}
          </span>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-text-primary">
            {poll.title}
          </h2>

          {poll.description && (
            <p className="mt-2 max-w-2xl text-text-secondary">
              {poll.description}
            </p>
          )}
        </div>

        <div>
          {action && (
            <Button onClick={() => navigate(action.path)}>
              {action.label}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
