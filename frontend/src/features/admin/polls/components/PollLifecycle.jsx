const states = ["DRAFT", "SCHEDULED", "OPEN", "CLOSED"];

export default function PollLifecycle({ status }) {
  const currentIndex = states.indexOf(status);

  const isCancelled = status === "CANCELLED";

  return (
    <section>
      <h2 className="text-lg font-semibold text-text-primary">Lifecycle</h2>

      <div className="mt-4 overflow-x-auto">
        <div className="flex min-w-max items-center">
          {states.map((state, index) => {
            const isCurrent = state === status;

            const isCompleted = !isCancelled && currentIndex > index;

            return (
              <div key={state} className="flex items-center">
                <div
                  className={[
                    "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium",
                    isCurrent
                      ? "border-primary bg-primary/10 text-primary"
                      : isCompleted
                        ? "border-success/30 bg-success/5 text-success"
                        : "border-border text-text-muted",
                  ].join(" ")}
                >
                  <span>{state}</span>
                </div>

                {index < states.length - 1 && (
                  <div className="mx-2 h-px w-8 bg-border" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {isCancelled && (
        <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
          This poll was cancelled and can no longer transition through the
          normal lifecycle.
        </p>
      )}
    </section>
  );
}
