import Button from "../../../components/ui/Button";

export default function HistoryPagination({
  pagination,
  onPrevious,
  onNext,
  isFetching,
}) {
  if (!pagination) {
    return null;
  }

  return (
    <div className="flex items-center justify-between border-t border-border pt-4">
      <p className="text-sm text-text-secondary">
        Page {pagination.page} of {pagination.totalPages || 1}
      </p>

      <div className="flex gap-2">
        <Button
          variant="secondary"
          size="sm"
          disabled={!pagination.hasPreviousPage || isFetching}
          onClick={onPrevious}
        >
          Previous
        </Button>

        <Button
          variant="secondary"
          size="sm"
          disabled={!pagination.hasNextPage || isFetching}
          onClick={onNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
