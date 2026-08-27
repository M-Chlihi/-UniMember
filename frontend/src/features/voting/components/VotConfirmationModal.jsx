import PropTypes from "prop-types";
import Button from "../../../components/ui/Button";

export default function VoteConfirmationModal({
  open,
  pollTitle,
  optionTitle,
  onClose,
}) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="vote-confirmation-title"
        className="w-full max-w-md rounded-xl bg-surface p-6 shadow-elevated"
      >
        <div className="text-center">
          <div
            className="mx-auto flex size-12 items-center justify-center rounded-full bg-green-50 text-green-700"
            aria-hidden="true"
          >
            ✓
          </div>

          <h2
            id="vote-confirmation-title"
            className="mt-4 text-xl font-semibold text-text-primary"
          >
            Vote submitted successfully
          </h2>

          <p className="mt-2 text-sm text-text-secondary">
            Your vote for{" "}
            <span className="font-semibold text-text-primary">{pollTitle}</span>{" "}
            has been recorded.
          </p>

          <div className="mt-5 rounded-lg bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
              Your choice
            </p>

            <p className="mt-1 font-semibold text-text-primary">
              {optionTitle}
            </p>
          </div>

          <div className="mt-6">
            <Button fullWidth onClick={onClose}>
              Back to dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

VoteConfirmationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  pollTitle: PropTypes.string.isRequired,
  optionTitle: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
