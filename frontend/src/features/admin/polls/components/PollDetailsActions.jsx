import { useNavigate } from "react-router-dom";
import Button from "../../../../components/ui/Button";

export default function PollDetailsActions({ poll }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap gap-3">
      {(poll.status === "DRAFT" || poll.status === "SCHEDULED") && (
        <Button
          variant="secondary"
          onClick={() => navigate(`/admin/polls/${poll.id}/edit`)}
        >
          Edit poll
        </Button>
      )}

      {poll.status === "CLOSED" && (
        <Button onClick={() => navigate(`/member/poll/${poll.id}/results`)}>
          View results
        </Button>
      )}

      <Button variant="ghost" onClick={() => navigate("/admin/polls")}>
        Back to polls
      </Button>
    </div>
  );
}
