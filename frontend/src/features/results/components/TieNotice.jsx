import Card from "../../../components/ui/Card";

export default function TieNotice({ winners }) {
  return (
    <Card>
      <div className="text-center">
        <h2 className="text-lg font-semibold text-text-primary">It's a tie</h2>

        <p className="mt-2 text-sm text-text-secondary">
          {winners[0].title} & {winners[1].title} received the same highest
          number of votes.
        </p>
      </div>
    </Card>
  );
}
