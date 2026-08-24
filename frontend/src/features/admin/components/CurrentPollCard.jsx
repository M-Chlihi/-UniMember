import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function CurrentPollCard({ poll }) {
  const navigate = useNavigate();

  if (!poll) {
    return (
      <Card title="Current poll">
        <p className="text-text-secondary">
          There is no active poll right now.
        </p>
      </Card>
    );
  }

  return (
    <Card title="Current poll">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <Badge variant="success">{poll.status}</Badge>
        </div>

        <div>
          <h2 className="text-xl font-semibold">{poll.title}</h2>

          {poll.description && (
            <p className="mt-1 text-sm text-text-secondary">
              {poll.description}
            </p>
          )}
        </div>

        <Button onClick={() => navigate(`/admin/polls/${poll.id}`)}>
          Manage poll
        </Button>
      </div>
    </Card>
  );
}
