import Card from "../../../components/ui/Card";
import ResultsOption from "./ResultsOption";

export default function ResultsList({ options }) {
  return (
    <Card title="Final results">
      <div className="space-y-6">
        {options.map((option) => (
          <ResultsOption key={option.optionId} option={option} />
        ))}
      </div>
    </Card>
  );
}
