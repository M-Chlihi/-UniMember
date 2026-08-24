import Button from "../ui/Button";

export default function ErrorScreen({ onRetry }) {
  return (
    <main className="error-screen" role="alert">
      <h1>Something went wrong</h1>

      <p>The application couldn't complete this request.</p>

      {onRetry && <Button onClick={onRetry}>Try again</Button>}
    </main>
  );
}
