import { useNavigate } from "react-router-dom";
import Button from "../../../../components/ui/Button";
import Badge from "../../../../components/ui/Badge";

const statusVariant = {
  DRAFT: "default",
  SCHEDULED: "info",
  OPEN: "success",
  CLOSED: "default",
  CANCELLED: "danger",
};

export default function PollManagementRow({ poll, mobile = false }) {
  const navigate = useNavigate();

  const viewDetails = () => {
    navigate(`/admin/polls/${poll.id}`);
  };

  if (mobile) {
    return (
      <Button variant="secondary" size="sm" onClick={viewDetails}>
        View details
      </Button>
    );
  }

  return (
    <tr>
      <td className="px-6 py-4">
        <div>
          <p className="font-medium text-text-primary">{poll.title}</p>

          {poll.description && (
            <p className="mt-1 max-w-md truncate text-sm text-text-muted">
              {poll.description}
            </p>
          )}
        </div>
      </td>

      <td className="px-6 py-4">
        <Badge variant={statusVariant[poll.status] ?? "default"}>
          {poll.status}
        </Badge>
      </td>

      <td className="px-6 py-4 text-sm text-text-secondary">
        {poll.startsAt ? new Date(poll.startsAt).toLocaleString() : "—"}
      </td>

      <td className="px-6 py-4 text-sm text-text-secondary">
        {poll.endsAt ? new Date(poll.endsAt).toLocaleString() : "—"}
      </td>

      <td className="px-6 py-4">
        <Button variant="ghost" size="sm" onClick={viewDetails}>
          View
        </Button>
      </td>
    </tr>
  );
}
