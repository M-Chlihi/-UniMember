import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import LoadingScreen from "../../../components/feedback/LoadingScreen";
import ErrorState from "../../../components/feedback/ErrorState";
import EmptyState from "../../../components/feedback/EmptyState";

import { useOpenPolls } from "../hooks/useOpenPoll";

const formatDate = (value) => {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

export default function ActivePollsPage() {
  const { data, isLoading, isError, error, refetch, isFetching } =
    useOpenPolls();
  console.log(data);
  if (isLoading) {
    return <LoadingScreen message="Loading active polls..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Active polls unavailable"
        message={
          error?.response?.data?.message ?? "We couldn't load the active polls."
        }
        onRetry={refetch}
        loading={isFetching}
      />
    );
  }

  const polls = data.data ?? [];

  if (!polls.length) {
    return (
      <EmptyState
        title="No active polls"
        message="There are currently no polls open for voting. Check back when a new poll is published."
      />
    );
  }

  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm font-medium text-primary">Participation</p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-text-primary">
          Active polls
        </h1>

        <p className="mt-2 max-w-2xl text-text-secondary">
          Browse every poll that is currently open for voting.
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-2">
        {polls.map((poll, index) => (
          <motion.article
            key={poll.id}
            initial={{
              opacity: 0,
              y: 16,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.45,
              delay: index * 0.06,
            }}
            className="rounded-2xl border border-border bg-surface p-6 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-7"
          >
            <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
              Open
            </span>

            <h2 className="mt-4 text-xl font-semibold tracking-tight text-text-primary">
              {poll.title}
            </h2>

            {poll.description && (
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-text-secondary">
                {poll.description}
              </p>
            )}

            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-5">
              <div>
                <p className="text-xs text-text-muted">Opens</p>

                <p className="mt-1 text-sm font-medium text-text-primary">
                  {formatDate(poll.startsAt)}
                </p>
              </div>

              <div>
                <p className="text-xs text-text-muted">Closes</p>

                <p className="mt-1 text-sm font-medium text-text-primary">
                  {formatDate(poll.endsAt)}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to={`/member/poll/${poll.id}`}
                className="group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-text-primary px-5 text-sm font-medium text-text-inverse transition-transform duration-200 hover:-translate-y-0.5 sm:w-auto"
              >
                Vote now
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
