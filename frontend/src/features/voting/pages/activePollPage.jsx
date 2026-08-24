import { useParams } from "react-router-dom";

import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";

import LoadingScreen from "../../../components/feedback/LoadingScreen";
import ErrorState from "../../../components/feedback/ErrorState";
import EmptyState from "../../../components/feedback/EmptyState";

import { usePoll } from "../../polls/hooks/usePoll";
import { useMyVote } from "../hooks/useMyVote";
import { useCastVote } from "../hooks/useCastVote";

import VotingPanel from "../components/VotingPanel";
import VoteSuccess from "../components/VoteSucess";

export default function ActivePollPage() {
  const { pollId } = useParams();

  const pollQuery = usePoll(pollId);

  const myVoteQuery = useMyVote(pollId);

  const voteMutation = useCastVote(pollId);

  if (pollQuery.isLoading || myVoteQuery.isLoading) {
    return <LoadingScreen message="Loading poll..." />;
  }

  if (pollQuery.isError || myVoteQuery.isError) {
    return (
      <ErrorState
        title="Unable to load poll"
        message="We couldn't load this poll."
        onRetry={() => {
          pollQuery.refetch();
          myVoteQuery.refetch();
        }}
      />
    );
  }

  const poll = pollQuery.data?.data;
  const myVote = myVoteQuery.data?.data;
  console.log(poll);
  console.log(myVote);
  if (!poll) {
    return (
      <EmptyState
        title="Poll not found"
        message="This poll is no longer available."
      />
    );
  }

  if (poll.status !== "OPEN") {
    return (
      <Card>
        <Badge>{poll.status}</Badge>

        <h1 className="mt-4 text-3xl font-bold">{poll.title}</h1>

        <p className="mt-2 text-text-secondary">
          This poll is not currently open for voting.
        </p>
      </Card>
    );
  }

  if (myVote) {
    return <VoteSuccess poll={poll} vote={myVote} />;
  }

  const handleVote = async (optionId) => {
    await voteMutation.mutateAsync(optionId);
  };

  return (
    <div className="space-y-8">
      <div>
        <Badge variant="success">OPEN</Badge>

        <h1 className="mt-3 text-3xl font-bold">{poll.title}</h1>

        {poll.description && (
          <p className="mt-2 max-w-2xl text-text-secondary">
            {poll.description}
          </p>
        )}
      </div>

      <Card title="Choose one course">
        <VotingPanel
          options={poll.options}
          onVote={handleVote}
          isSubmitting={voteMutation.isPending}
        />
      </Card>
    </div>
  );
}
