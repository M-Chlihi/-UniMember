export default function BrandMark({ size = "md" }) {
  const sizes = {
    sm: "size-6",
    md: "size-8",
    lg: "size-12",
  };

  return (
    <img
      src="./unimember-mark.svg"
      alt=""
      className={`${sizes[size] ?? sizes.md} w-auto`}
    />
  );
}
