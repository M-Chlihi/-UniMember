import PropTypes from "prop-types";

export default function Input({ label, error, helperText, id, ...props }) {
  const inputId = id || props.name;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  return (
    <div className="space-y-2">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-text-primary"
      >
        {label}
      </label>

      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : helperText ? helperId : undefined}
        className={[
          "block w-full  border bg-surface",
          "px-3 py-2.5 text-sm text-text-primary",
          "outline-none transition",
          "placeholder:text-text-muted",
          "focus:ring-2 focus:ring-offset-1",
          error
            ? "border-danger focus:ring-danger"
            : "border-border focus:border-primary focus:ring-primary",
        ].join(" ")}
        {...props}
      />

      {error ? (
        <p id={errorId} className="text-sm text-danger">
          {error}
        </p>
      ) : helperText ? (
        <p id={helperId} className="text-sm text-text-muted">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  helperText: PropTypes.string,
  id: PropTypes.string,
};
