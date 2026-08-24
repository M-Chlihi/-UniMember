import PropTypes from "prop-types";

export default function Spinner({ size = "md" }) {
  const sizes = {
    sm: "size-4",
    md: "size-6",
    lg: "size-8",
  };

  return (
    <span
      role="status"
      aria-label="Loading"
      className={[
        "inline-block animate-spin rounded-full",
        "border-2 border-slate-200 border-t-primary",
        sizes[size],
      ].join(" ")}
    />
  );
}

Spinner.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg"]),
};
