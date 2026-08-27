import { useNavigate } from "react-router-dom";

import Button from "../../../components/ui/Button";
import NotificationStatusBadge from "./NotificationStatusBadge";

export default function NotificationRow({ notification, mobile = false }) {
  const navigate = useNavigate();
  console.log(notification);
  const viewDetails = () => {
    navigate(`/admin/notifications/${notification.id}`);
  };

  if (mobile) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-medium">{notification.type}</span>

          <NotificationStatusBadge status={notification.status} />
        </div>

        <div className="grid gap-2 text-sm">
          <p>
            <span className="text-text-muted">Channel:</span>{" "}
            {notification.channel}
          </p>

          <p className="break-all">
            <span className="text-text-muted">Recipient:</span>{" "}
            {notification.recipient.email}
          </p>

          <p>
            <span className="text-text-muted">Attempts:</span>{" "}
            {notification.attempts}
          </p>
        </div>

        <Button variant="secondary" size="sm" onClick={viewDetails}>
          View details
        </Button>
      </div>
    );
  }

  return (
    <tr>
      <td className="px-6 py-4 text-sm">{notification.recipient.email}</td>

      <td className="px-6 py-4 text-sm">{notification.type}</td>

      <td className="px-6 py-4 text-sm">{notification.channel}</td>

      <td className="px-6 py-4">
        <NotificationStatusBadge status={notification.status} />
      </td>

      <td className="px-6 py-4 text-sm">{notification.attempts}</td>

      <td className="px-6 py-4">
        <Button variant="ghost" size="sm" onClick={viewDetails}>
          View
        </Button>
      </td>
    </tr>
  );
}
