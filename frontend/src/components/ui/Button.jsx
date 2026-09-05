import PropTypes from "prop-types";
const variants = {
  primary:
    " bg-but text-text-inverse hover:bg-buthover focus-visible:ring-primary",
  secondary:
    "bg-surface border border-border text-text-primary hover:bg-slate-50 focus-visible:ring-primary",
  danger:
    "bg-danger text-text-inverse hover:bg-red-700 focus-visible:ring-danger",
  ghost:
    "bg-transparent text-text-secondary underline hover:bg-slate-100 focus-visible:ring-primary",
  hist: "bg-history text-text-inverse  hover:bg-history-80 focus-visible:ring-primary",
};

const sizes = {
  sm: "min-h-9 px-3 text-sm",
  md: "min-h-10 px-4 text-sm",
  lg: "min-h-11 px-5 text-base",
};
export default function Button({
  children,
  type = "button",
  variant = "primary",
  loading = false,
  disabled = false,
  fullWidth = false,
  size = "sm",
  onClick,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={[
        "inline-flex items-center justify-center gap-2",
        "rounded-md font-medium",
        "transition-colors duration-150",
        "focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:opacity-50",
        "disabled:pointer-events-none",
        sizes[size],
        variants[variant],
        fullWidth ? "w-full" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {loading && (
        <span
          className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      )}

      <span>{children}</span>
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "secondary", "danger", "ghost"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
};
