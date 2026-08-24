import PropTypes from "prop-types";

const variants = {
  default: "bg-slate-100 text-slate-700",
  success: "bg-green-50 text-green-700",
  warning: "bg-amber-50 text-amber-700",
  danger: "bg-red-50 text-red-700",
  info: "bg-sky-50 text-sky-700",
};

export default function Badge({ children, variant = "default" }) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full",
        "px-2.5 py-1 text-xs font-medium",
        variants[variant],
      ].join(" ")}
    >
      {children}
    </span>
  );
}

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["default", "success", "warning", "danger", "info"]),
};
