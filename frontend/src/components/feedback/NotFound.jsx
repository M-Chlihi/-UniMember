import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-16">
      <div className="max-w-md text-center">
        <h1 className="text-5xl font-semibold uppercase tracking-[0.18em] text-brand">
          404
        </h1>

        <p className="mt-4 text-sm leading-7 text-text-secondary">
          The page you're looking for doesn't exist or may have moved.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex min-h-12 items-center justify-center  bg-text-primary px-6 text-sm font-medium text-text-inverse"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}
