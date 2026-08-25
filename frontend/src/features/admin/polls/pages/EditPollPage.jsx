import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Card from "../../../../components/ui/Card";

import LoadingScreen from "../../../../components/feedback/LoadingScreen";
import ErrorState from "../../../../components/feedback/ErrorState";

import PollForm from "../components/PollForm";

import { useAdminPoll } from "../hooks/useAdminPoll";
import { useUpdatePoll } from "../hooks/useUpdatePoll";

export default function EditPollPage() {
  const { pollId } = useParams();

  const navigate = useNavigate();

  const pollQuery = useAdminPoll(pollId);

  const updateMutation = useUpdatePoll();

  if (pollQuery.isLoading) {
    return <LoadingScreen message="Loading poll..." />;
  }

  if (pollQuery.isError) {
    return (
      <ErrorState
        title="Unable to load poll"
        message={
          pollQuery.error?.response?.data?.message ||
          "We couldn't load this poll."
        }
        onRetry={pollQuery.refetch}
      />
    );
  }

  const poll = pollQuery.data?.data;

  if (!poll) {
    return (
      <ErrorState
        title="Poll not found"
        message="This poll is no longer available."
      />
    );
  }

  const handleSubmit = async (formData) => {
    try {
      await updateMutation.mutateAsync({
        pollId,
        payload: formData,
      });

      navigate(`/admin/polls/${pollId}`);
    } catch {
      // Error shown below.
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm font-medium text-primary">Poll management</p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight">Edit poll</h1>
      </header>

      {updateMutation.isError && (
        <ErrorState
          title="Unable to update poll"
          message={
            updateMutation.error?.response?.data?.message ||
            "Something went wrong while updating the poll."
          }
        />
      )}

      <Card>
        <PollForm
          defaultValues={{
            title: poll.title ?? "",
            description: poll.description ?? "",
            startsAt: poll.startsAt
              ? new Date(poll.startsAt).toISOString().slice(0, 16)
              : "",
            endsAt: poll.endsAt
              ? new Date(poll.endsAt).toISOString().slice(0, 16)
              : "",
            options:
              poll.options?.map((option) => ({
                title: option.title ?? "",
                description: option.description ?? "",
              })) ?? [],
          }}
          onSubmit={handleSubmit}
          submitting={updateMutation.isPending}
        />
      </Card>
    </div>
  );
}
