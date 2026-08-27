import { useNavigate } from "react-router-dom";

import Card from "../../../../components/ui/Card";
import ErrorState from "../../../../components/feedback/ErrorState";

import PollForm from "../components/PollForm";
import { useCreatePoll } from "../hooks/useCreatePoll";
import { useRef } from "react";
export default function CreatePollPage() {
  const navigate = useNavigate();

  const mutation = useCreatePoll();
  // console.log(mutation);
  const submitLock = useRef(false);

  const handleSubmit = async (formData) => {
    console.log("CREATE POLL SUBMIT START", Date.now());

    if (submitLock.current) {
      console.warn("CREATE POLL BLOCKED — already submitting");
      return;
    }

    submitLock.current = true;
    try {
      const result = await mutation.mutateAsync(formData);

      console.log("CREATE POLL SUCCESS", result);

      navigate("/admin/polls");
    } catch (err) {
      console.error("CREATE POLL FAILED", err);

      submitLock.current = false;
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
