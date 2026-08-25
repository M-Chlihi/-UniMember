import { useNavigate } from "react-router-dom";
import Button from "../../../../components/ui/Button";

export default function PollActions({ poll }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        size="sm"
        variant="ghost"
        onClick={() => navigate(`/admin/polls/${poll.id}`)}
      >
        View
      </Button>

      {(poll.status === "DRAFT" || poll.status === "SCHEDULED") && (
        <Button
          size="sm"
          variant="secondary"
          onClick={() => navigate(`/admin/polls/${poll.id}/edit`)}
        >
          Edit
        </Button>
      )}

      {poll.status === "DRAFT" && (
        <>
          <Button
            size="sm"
            onClick={() => {
              // publish mutation later
            }}
          >
            Publish
          </Button>

          <Button
            size="sm"
            variant="danger"
            onClick={() => {
              // delete mutation later
            }}
          >
            Delete
          </Button>
        </>
      )}

      {(poll.status === "DRAFT" ||
        poll.status === "SCHEDULED" ||
        poll.status === "OPEN") && (
        <Button
          size="sm"
          variant="danger"
          onClick={() => {
            // cancel mutation later
          }}
        >
          Cancel
        </Button>
      )}
    </div>
  );
}
