export default function ResultsOption({ option }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4">
        <p className="font-medium text-text-primary">{option.optionTitle}</p>

        <p className="text-sm font-semibold text-text-primary">
          {option.percentage}%
        </p>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{
            width: `${option.percentage}%`,
          }}
          role="progressbar"
          aria-valuenow={option.percentage}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label={`${option.optionTitle}: ${option.percentage}%`}
        />
      </div>

      <p className="text-xs text-text-muted">
        {option.votes} vote
        {option.votes === 1 ? "" : "s"}
      </p>
    </div>
  );
}
