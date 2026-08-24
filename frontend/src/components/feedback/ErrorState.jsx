import PropTypes from "prop-types";
import Button from "../ui/Button";

export default function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load this information.",
  onRetry,
}) {
  return (
    <section
      role="alert"
      className="rounded-lg border border-red-200 bg-red-50 px-6 py-8 text-center"
    >
      <h2 className="text-lg font-semibold text-red-900">{title}</h2>

      <p className="mt-2 text-sm text-red-700">{message}</p>

      {onRetry && (
        <div className="mt-5">
          <Button variant="secondary" onClick={onRetry}>
            Try again
          </Button>
        </div>
      )}
    </section>
  );
}

ErrorState.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  onRetry: PropTypes.func,
};
