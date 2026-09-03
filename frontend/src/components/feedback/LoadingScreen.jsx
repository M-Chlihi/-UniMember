import Spinner from "../ui/spinner";

export default function LoadingScreen({ message = "Loading..." }) {
  return (
    <main
      className="flex min-h-[60vh] flex-col items-center justify-center gap-4"
      aria-live="polite"
    >
      <Spinner size="lg" />

      <p className="text-sm text-text-secondary">{message}</p>
    </main>
  );
}
