import PropTypes from "prop-types";

export default function EmptyState({ title, message, action }) {
  return (
    <section
      className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-surface px-6 py-12 text-center"
      aria-live="polite"
    >
      <h2 className="text-lg font-semibold text-text-primary">{title}</h2>

      {message && (
        <p className="mt-2 max-w-md text-sm text-text-secondary">{message}</p>
      )}

      {action && <div className="mt-5">{action}</div>}
    </section>
  );
}

EmptyState.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
  action: PropTypes.node,
};
