import Card from "../../../../components/ui/Card";

export default function PollOptionsList({ options = [] }) {
  return (
    <Card title="Options">
      {!options.length ? (
        <p className="text-sm text-text-secondary">
          No options have been added yet.
        </p>
      ) : (
        <div className="space-y-3">
          {options.map((option, index) => (
            <div
              key={option.id}
              className="rounded-lg border border-border p-4"
            >
              <div className="flex items-start gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-text-secondary">
                  {index + 1}
                </span>

                <div>
                  <h3 className="font-medium text-text-primary">
                    {option.title}
                  </h3>

                  {option.description && (
                    <p className="mt-1 text-sm text-text-secondary">
                      {option.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
