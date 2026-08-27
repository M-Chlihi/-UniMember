import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Card from "../../../../components/ui/Card";

import LoadingScreen from "../../../../components/feedback/LoadingScreen";
import ErrorState from "../../../../components/feedback/ErrorState";

import PollForm from "../components/PollForm";

import { useAdminPoll } from "../hooks/useAdminPoll";
import { useUpdatePoll } from "../hooks/useUpdatePoll";
const toLocalDateTimeInput = (value) => {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const pad = (number) => String(number).padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};
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
  console.log(poll.endsAt);
  console.log(new Date(poll.endsAt));
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
            startsAt: poll.startsAt ? toLocalDateTimeInput(poll.startsAt) : "",
            endsAt: poll.endsAt ? toLocalDateTimeInput(poll.endsAt) : "",
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
