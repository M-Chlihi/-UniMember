import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../../../components/ui/Button";
import ConfirmDialog from "../../../../components/ui/ConfirmDialog";
import ErrorState from "../../../../components/feedback/ErrorState";
import { PERMISSIONS } from "../../../auth/constants/permissions";

import { usePublishPoll } from "../hooks/usePublishPoll";
import { useCancelPoll } from "../hooks/useCancelPoll";
import { useDeleteDraftPoll } from "../hooks/useDeleteDraftPoll";
import Can from "../../../auth/componenets/Can";

export default function PollDetailsActions({ poll }) {
  const navigate = useNavigate();

  const [dialog, setDialog] = useState(null);

  const publishMutation = usePublishPoll();

  const cancelMutation = useCancelPoll();

  const deleteMutation = useDeleteDraftPoll();
  console.log(deleteMutation);
  const closeDialog = () => {
    setDialog(null);
  };

  const handlePublish = async () => {
    try {
      await publishMutation.mutateAsync(poll.id);

      closeDialog();
    } catch {
      // Error is shown below.
    }
  };

  const handleCancel = async () => {
    try {
      await cancelMutation.mutateAsync(poll.id);

      closeDialog();
    } catch {
      // Error is shown below.
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(poll.id);

      navigate("/admin/polls");
    } catch {
      // Error is shown below.
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {(poll.status === "DRAFT" || poll.status === "SCHEDULED") && (
          <Can permission={PERMISSIONS.POLL_EDIT}>
            <Button
              variant="secondary"
              onClick={() => navigate(`/admin/polls/${poll.id}/edit`)}
            >
              Edit poll
            </Button>
          </Can>
        )}

        {poll.status === "DRAFT" && (
          <>
            <Button onClick={() => setDialog("publish")}>Publish</Button>
            <Can permission={PERMISSIONS.POLL_PUBLISH}>
              <Button variant="danger" onClick={() => setDialog("delete")}>
                Delete draft
              </Button>
            </Can>
          </>
        )}

        {(poll.status === "DRAFT" ||
          poll.status === "SCHEDULED" ||
          poll.status === "OPEN") && (
          <Button variant="danger" onClick={() => setDialog("cancel")}>
            Cancel poll
          </Button>
        )}

        {poll.status === "CLOSED" && (
          <Button onClick={() => navigate(`/member/poll/${poll.id}/results`)}>
            View results
          </Button>
        )}

        <Button variant="ghost" onClick={() => navigate("/admin/polls")}>
          Back
        </Button>
      </div>
      {publishMutation.isError && (
        <ErrorState
          title="Unable to publish poll"
          message={
            publishMutation.error?.response?.data?.message ||
            "The poll could not be published."
          }
        />
      )}
      <ConfirmDialog
        open={dialog === "publish"}
        title="Publish this poll?"
        message="Publishing will move the poll out of the draft state. Make sure the schedule and options are correct."
        confirmLabel="Publish poll"
        loading={publishMutation.isPending}
        onCancel={closeDialog}
        onConfirm={handlePublish}
      />
      {cancelMutation.isError && (
        <ErrorState
          title="Unable to publish poll"
          message={
            publishMutation.error?.response?.data?.message ||
            "The poll could not be published."
          }
        />
      )}
      <ConfirmDialog
        open={dialog === "cancel"}
        title="Cancel this poll?"
        message="A cancelled poll cannot continue through the normal lifecycle."
        confirmLabel="Cancel poll"
        danger
        loading={cancelMutation.isPending}
        onCancel={closeDialog}
        onConfirm={handleCancel}
      />
      {deleteMutation.isError && (
        <ErrorState
          title="Unable to delete poll"
          message={
            publishMutation.error?.response?.data?.message ||
            "The poll could not be deleted."
          }
        />
      )}
      <ConfirmDialog
        open={dialog === "delete"}
        title="Delete this draft?"
        message="This action permanently removes the draft poll."
        confirmLabel="Delete draft"
        danger
        loading={deleteMutation.isPending}
        onCancel={closeDialog}
        onConfirm={handleDelete}
      />
    </>
  );
} // import { useNavigate } from "react-router-dom";
// import Button from "../../../../components/ui/Button";

// export default function PollDetailsActions({ poll }) {
//   const navigate = useNavigate();

//   return (
//     <div className="flex flex-wrap gap-3">
//       {(poll.status === "DRAFT" || poll.status === "SCHEDULED") && (
//         <Button
//           variant="secondary"
//           onClick={() => navigate(`/admin/polls/${poll.id}/edit`)}
//         >
//           Edit poll
//         </Button>
//       )}

//       {poll.status === "CLOSED" && (
//         <Button onClick={() => navigate(`/member/poll/${poll.id}/results`)}>
//           View results
//         </Button>
//       )}

//       <Button variant="ghost" onClick={() => navigate("/admin/polls")}>
//         Back to polls
//       </Button>
//     </div>
//   );
// }
