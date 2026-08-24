import Card from "../../../components/ui/Card";

export default function TieNotice() {
  return (
    <Card>
      <div className="text-center">
        <h2 className="text-lg font-semibold text-text-primary">It's a tie</h2>

        <p className="mt-2 text-sm text-text-secondary">
          Two or more course options received the same highest number of votes.
        </p>
      </div>
    </Card>
  );
}
