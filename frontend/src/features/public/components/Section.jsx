export default function Section({ children, id, className = "" }) {
  return (
    <section id={id} className={`px-5 sm:px-8 lg:px-10 ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
