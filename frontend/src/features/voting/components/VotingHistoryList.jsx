import VotingHistoryCard from "./VotingHistoryCard";

export default function VotingHistoryList({ items }) {
  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <VotingHistoryCard key={item.poll.id} item={item} />
      ))}
    </div>
  );
}
