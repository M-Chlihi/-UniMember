import { useNavigate } from "react-router-dom";

import Card from "../../../../components/ui/Card";
import ErrorState from "../../../../components/feedback/ErrorState";

import PollForm from "../components/PollForm";
import { useCreatePoll } from "../hooks/useCreatePoll";

export default function CreatePollPage() {
  const navigate = useNavigate();

  const mutation = useCreatePoll();
  // console.log(mutation);

  const handleSubmit = async (formData) => {
    try {
      await mutation.mutateAsync(formData);
      console.log(await mutation.mutateAsync(formData));
      navigate("/admin/polls");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm font-medium text-primary">Poll management</p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight">Create poll</h1>
      </header>

      {mutation.isError && (
        <ErrorState
          title="Unable to create poll"
          message={
            mutation.error?.response?.data?.message ||
            "Something went wrong while creating the poll."
          }
        />
      )}

      <Card>
        <PollForm onSubmit={handleSubmit} submitting={mutation.isPending} />
      </Card>
    </div>
  );
}
