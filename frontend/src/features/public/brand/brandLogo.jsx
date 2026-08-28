import { Link } from "react-router-dom";

const sizeClasses = {
  sm: {
    icon: "size-6",
    text: "text-base",
  },
  md: {
    icon: "size-7",
    text: "text-lg",
  },
  lg: {
    icon: "size-10",
    text: "text-2xl",
  },
};

export default function BrandLogo({
  size = "md",
  showName = true,
  href = "/",
  onClick,
}) {
  const styles = sizeClasses[size] ?? sizeClasses.md;

  return (
    <Link
      to={href}
      onClick={onClick}
      className="inline-flex items-center gap-2"
      aria-label="UniMember home"
    >
      <img
        src="../brand/unimember-mark.svg"
        alt=""
        className={`${styles.icon} w-auto shrink-0`}
      />

      {showName && (
        <span
          className={`${styles.text} font-semibold tracking-tight text-text-primary`}
        >
          UniMember
        </span>
      )}
    </Link>
  );
}
