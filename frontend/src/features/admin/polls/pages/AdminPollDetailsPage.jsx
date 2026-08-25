import { useParams } from "react-router-dom";

import LoadingScreen from "../../../../components/feedback/LoadingScreen";
import ErrorState from "../../../../components/feedback/ErrorState";
import EmptyState from "../../../../components/feedback/EmptyState";

import PollDetailsHeader from "../components/PollDetailsHeader";
import PollDetailsMeta from "../components/PollDetailsMeta";
import PollOptionsList from "../components/PollOptionsList";
import PollLifecycle from "../components/PollLifecycle";
import PollDetailsActions from "../components/PollDetailsActions";

import { useAdminPoll } from "../hooks/useAdminPoll";

export default function AdminPollDetailsPage() {
  const { pollId } = useParams();

  const { data, isLoading, isError, error, refetch } = useAdminPoll(pollId);

  if (isLoading) {
    return <LoadingScreen message="Loading poll details..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Poll unavailable"
        message={
          error?.response?.data?.message || "We couldn't load this poll."
        }
        onRetry={refetch}
      />
    );
  }

  const poll = data?.data;
  if (!poll) {
    return (
      <EmptyState
        title="Poll not found"
        message="This poll is no longer available."
      />
    );
  }

  return (
    <div className="space-y-8">
      <PollDetailsHeader poll={poll} />

      <PollDetailsActions poll={poll} />

      <PollDetailsMeta poll={poll} />

      <PollLifecycle status={poll.status} />

      <PollOptionsList options={poll.options} />
    </div>
  );
}
