import Badge from "../../../../components/ui/Badge";

const statusVariant = {
  DRAFT: "default",
  SCHEDULED: "info",
  OPEN: "success",
  CLOSED: "default",
  CANCELLED: "danger",
};

export default function PollDetailsHeader({ poll }) {
  return (
    <header>
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant={statusVariant[poll.status] ?? "default"}>
          {poll.status}
        </Badge>
      </div>

      <h1 className="mt-3 text-3xl font-bold tracking-tight text-text-primary">
        {poll.title}
      </h1>

      {poll.description && (
        <p className="mt-2 max-w-3xl text-text-secondary">{poll.description}</p>
      )}
    </header>
  );
}
