import PropTypes from "prop-types";

export default function PollOptionCard({
  option,
  selected,
  disabled,
  onSelect,
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onSelect(option.id)}
      className={[
        "w-full rounded-lg border p-4 text-left transition",
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-primary",
        "focus-visible:ring-offset-2",

        selected
          ? "border-primary bg-primary/5"
          : "border-border bg-surface hover:border-primary/50",

        disabled ? "cursor-not-allowed opacity-60" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-pressed={selected}
    >
      <div className="flex items-start gap-3">
        <div
          className={[
            "mt-1 flex size-5 shrink-0 items-center justify-center rounded-full border-2",
            selected
              ? "border-primary bg-primary text-white"
              : "border-slate-300",
          ].join(" ")}
          aria-hidden="true"
        >
          {selected && <span className="text-xs font-bold">✓</span>}
        </div>

        <div className="min-w-0">
          <h3 className="font-semibold text-text-primary">{option.title}</h3>

          {option.description && (
            <p className="mt-1 text-sm text-text-secondary">
              {option.description}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}

PollOptionCard.propTypes = {
  option: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
};
