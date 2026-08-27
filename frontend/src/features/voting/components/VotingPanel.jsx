import Button from "../../../components/ui/Button";
import PollOptionCard from "./PollOptionCard";

export default function VotingPanel({
  options,
  selectedOptionId,
  onSelect,
  onSubmit,
  isSubmitting,
  hasVoted,
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-3" role="radiogroup" aria-label="Poll options">
        {options.map((option) => (
          <PollOptionCard
            key={option.id}
            option={option}
            selected={selectedOptionId === option.id}
            disabled={hasVoted || isSubmitting}
            onSelect={onSelect}
          />
        ))}
      </div>

      {!hasVoted && (
        <Button
          fullWidth
          size="lg"
          disabled={!selectedOptionId}
          loading={isSubmitting}
          onClick={onSubmit}
        >
          Submit vote
        </Button>
      )}
    </div>
  );
}
