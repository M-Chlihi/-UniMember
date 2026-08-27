import PropTypes from "prop-types";
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

export default function VotingHistoryCard({ item }) {
  const { poll, myVote } = item;
  const navigate = useNavigate();
  const variant = statusVariant[poll.status] ?? "default";
  const formatDateTime = (value) =>
    new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  return (
    <Card>
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Badge variant={variant}>{poll.status}</Badge>

          {/* <time dateTime={myVote.votedAt} className="text-sm text-text-muted">
            {new Date(myVote.votedAt).toLocaleDateString()}
          </time> */}
          <time dateTime={myVote.votedAt}>
            Voted {formatDateTime(myVote.votedAt)}
          </time>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text-primary">
            {poll.title}
          </h2>

          {poll.description && (
            <p className="mt-1 text-sm text-text-secondary">
              {poll.description}
            </p>
          )}
        </div>

        <div className="rounded-md bg-slate-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
            Your choice
          </p>

          <p className="mt-1 font-semibold text-text-primary">
            {myVote.optionTitle}
          </p>
        </div>
      </div>
      <div>
        {poll.status === "CLOSED" && (
          <Button
            variant="danger"
            size="sm"
            onClick={() => navigate(`/member/poll/${poll.id}/results`)}
          >
            View results
          </Button>
        )}
      </div>
    </Card>
  );
}

VotingHistoryCard.propTypes = {
  item: PropTypes.shape({
    poll: PropTypes.object.isRequired,
    myVote: PropTypes.object.isRequired,
  }).isRequired,
};
