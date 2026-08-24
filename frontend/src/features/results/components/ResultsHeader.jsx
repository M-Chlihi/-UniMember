import Badge from "../../../components/ui/Badge";

export default function ResultsHeader({ poll, results }) {
  return (
    <header>
      <Badge variant="default">CLOSED</Badge>

      <h1 className="mt-3 text-3xl font-bold tracking-tight text-text-primary">
        {poll.title}
      </h1>

      {poll.description && (
        <p className="mt-2 max-w-2xl text-text-secondary">{poll.description}</p>
      )}

      <div className="mt-4 text-sm text-text-secondary">
        {results.totalVotes} total vote
        {results.totalVotes === 1 ? "" : "s"}
      </div>
    </header>
  );
}
