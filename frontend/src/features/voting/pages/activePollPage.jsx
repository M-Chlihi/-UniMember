import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";

import LoadingScreen from "../../../components/feedback/LoadingScreen";
import ErrorState from "../../../components/feedback/ErrorState";
import EmptyState from "../../../components/feedback/EmptyState";

import { usePollforResults } from "../../polls/hooks/usePoll";

import { useMyVote } from "../hooks/useMyVote";
import { useCastVote } from "../hooks/useCastVote";

import VotingPanel from "../components/VotingPanel";
import VoteConfirmationModal from "../components/VoteConfirmationModal";

export default function ActivePollPage() {
  const { pollId } = useParams();
  const navigate = useNavigate();

  const [selectedOptionId, setSelectedOptionId] = useState(null);

  const [showConfirmation, setShowConfirmation] = useState(false);

  const [submittedOptionTitle, setSubmittedOptionTitle] = useState("");

  const pollQuery = usePollforResults(pollId);

  const myVoteQuery = useMyVote(pollId);

  const voteMutation = useCastVote(pollId);

  if (pollQuery.isLoading || myVoteQuery.isLoading) {
    return <LoadingScreen message="Loading poll..." />;
  }

  if (pollQuery.isError || myVoteQuery.isError) {
    return (
      <ErrorState
        title="Unable to load poll"
        message={
          pollQuery.error?.response?.data?.message ||
          myVoteQuery.error?.response?.data?.message ||
          "We couldn't load this poll."
        }
        onRetry={() => {
          pollQuery.refetch();
          myVoteQuery.refetch();
        }}
      />
    );
  }

  const poll = pollQuery.data?.data;

  const myVote = myVoteQuery.data?.data ?? null;

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

        <h1 className="mt-4 text-3xl font-bold text-text-primary">
          {poll.title}
        </h1>

        <p className="mt-2 text-text-secondary">
          This poll is not currently open for voting.
        </p>
      </Card>
    );
  }

  const hasVoted = Boolean(myVote);

  const effectiveSelectedOptionId = hasVoted
    ? myVote.optionId
    : selectedOptionId;

  const handleSelect = (optionId) => {
    if (hasVoted) {
      return;
    }

    setSelectedOptionId(optionId);
  };

  const handleVote = async () => {
    if (!selectedOptionId || hasVoted) {
      return;
    }

    try {
      const result = await voteMutation.mutateAsync(selectedOptionId);

      const optionTitle =
        result?.data?.optionTitle ??
        poll.options.find((option) => option.id === selectedOptionId)?.title ??
        "";

      setSubmittedOptionTitle(optionTitle);

      setShowConfirmation(true);
    } catch {
      // Error is rendered below.
    }
  };

  return (
    <>
      <div className="space-y-8">
        <header>
          <Badge variant="success">OPEN</Badge>

          <h1 className="mt-3 text-3xl font-bold text-text-primary">
            {poll.title}
          </h1>

          {poll.description && (
            <p className="mt-2 max-w-2xl text-text-secondary">
              {poll.description}
            </p>
          )}
        </header>

        <Card title="Choose one course">
          <VotingPanel
            options={poll.options}
            selectedOptionId={effectiveSelectedOptionId}
            onSelect={handleSelect}
            onSubmit={handleVote}
            isSubmitting={voteMutation.isPending}
            hasVoted={hasVoted}
          />

          {hasVoted && (
            <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4">
              <p className="font-medium text-green-800">
                Your vote has already been submitted.
              </p>

              <p className="mt-1 text-sm text-green-700">
                Your choice:{" "}
                <span className="font-semibold">{myVote.optionTitle}</span>
              </p>
            </div>
          )}

          {voteMutation.isError && (
            <div className="mt-6">
              <ErrorState
                title="Vote could not be submitted"
                message={
                  voteMutation.error?.response?.data?.message ||
                  "Something went wrong while submitting your vote."
                }
              />
            </div>
          )}
        </Card>
      </div>

      <VoteConfirmationModal
        open={showConfirmation}
        pollTitle={poll.title}
        optionTitle={submittedOptionTitle}
        onClose={() => {
          setShowConfirmation(false);
          navigate("/member");
        }}
      />
    </>
  );
}
