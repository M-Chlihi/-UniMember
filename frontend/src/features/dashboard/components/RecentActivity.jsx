import { useVotingHistory } from "../../voting/hooks/useVoteHistory";
import Moment from "react-moment";

import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import EmptyState from "../../../components/feedback/EmptyState";

export default function RecentActivity() {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useVotingHistory({
    page: 1,
    limit: 3,
    sort: "-createdAt",
  });
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  if (isLoading) {
    return (
      <Card title="Recent activity">
        <p className="text-sm text-text-secondary">
          Loading recent activity...
        </p>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card title="Recent activity">
        <p className="text-sm text-danger">Unable to load recent activity.</p>
      </Card>
    );
  }

  const items = data.data.data;
  if (!items.length) {
    return (
      <Card title="Recent activity">
        <EmptyState
          title="No voting history yet"
          message="Once you participate in a course poll, your recent activity will appear here."
        />
      </Card>
    );
  }

  return (
    <Card
      title="Recent activity"
      actions={
        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate("/member/history")}
        >
          View all
        </Button>
      }
    >
      <div className="divide-y divide-border">
        {items.map((item) => (
          <div key={item.poll.id} className="py-4 first:pt-0 last:pb-0">
            <p className="font-medium text-text-primary">{item.poll.title}</p>

            <p className="mt-1 text-sm text-text-secondary">
              You voted for :{" "}
              <span className="font-medium">{item.myVote.optionTitle}</span>
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              At :{" "}
              <span className="font-medium">
                <Moment format="MMMM Do YYYY, h:mm a">
                  {item.myVote.votedAt}
                </Moment>
              </span>
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
