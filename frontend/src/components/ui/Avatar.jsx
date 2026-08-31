export default function Avatar({ name = "", size = "md", className = "" }) {
  const initial = name.trim().charAt(0).toUpperCase() || "?";

  const sizes = {
    sm: "size-8 text-xs",
    md: "size-10 text-sm",
    lg: "size-20 text-2xl",
  };

  return (
    <div
      aria-hidden="true"
      className={[
        "flex shrink-0 items-center justify-center rounded-full",
        "bg-gradient-to-br  bg-blue-100 from-brand to-brand-violet",
        "font-semibold text-blue-950",
        sizes[size] ?? sizes.lg,
        className,
      ].join(" ")}
    >
      {initial}
    </div>
  );
}
