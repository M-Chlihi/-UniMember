import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";

export default function WinnerCard({ winner }) {
  return (
    <Card>
      <div className="text-center">
        <Badge variant="success">Winner</Badge>

        <h2 className="mt-4 text-2xl font-bold text-text-primary">
          {winner.title}
        </h2>

        <div className="mt-4">
          <span className="text-4xl font-bold text-primary">
            {winner.percentage}%
          </span>
        </div>

        <p className="mt-2 text-sm text-text-secondary">
          {winner.votes} vote
          {winner.votes === 1 ? "" : "s"}
        </p>
      </div>
    </Card>
  );
}
