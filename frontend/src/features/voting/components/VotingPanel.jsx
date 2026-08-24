import { useState } from "react";

import Button from "../../../components/ui/Button";
import PollOptionCard from "./PollOptionCard";

export default function VotingPanel({ options, onVote, isSubmitting }) {
  const [selectedOptionId, setSelectedOptionId] = useState(null);

  const handleSubmit = async () => {
    if (!selectedOptionId) {
      return;
    }

    await onVote(selectedOptionId);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {options.map((option) => (
          <PollOptionCard
            key={option.id}
            option={option}
            selected={selectedOptionId === option.id}
            disabled={isSubmitting}
            onSelect={setSelectedOptionId}
          />
        ))}
      </div>

      <Button
        fullWidth
        size="lg"
        disabled={!selectedOptionId}
        loading={isSubmitting}
        onClick={handleSubmit}
      >
        Submit vote
      </Button>
    </div>
  );
}
