import WelcomeHeader from "../components/WelcomeHeader";
import ActivePollCard from "../components/ActivePollCard";
import RecentActivity from "../components/RecentActivity";

import EmptyState from "../../../components/feedback/EmptyState";
import ErrorState from "../../../components/feedback/ErrorState";
import LoadingScreen from "../../../components/feedback/LoadingScreen";

import { useDashboard } from "../hooks/useDashboard";

export default function MemberDashboardPage() {
  const { activePoll, isLoading, isError, error, refetch } = useDashboard();
  if (isLoading) {
    return <LoadingScreen message="Loading your dashboard..." />;
  }

  return (
    <div className="space-y-8">
      <WelcomeHeader />

      {isError ? (
        <ErrorState
          title="Dashboard unavailable"
          message={error?.message || "We couldn't load your dashboard."}
          onRetry={refetch}
        />
      ) : activePoll?.poll ? (
        <ActivePollCard poll={activePoll.poll} />
      ) : (
        <EmptyState
          title="No active poll"
          message="There isn't a course vote open right now."
        />
      )}

      <RecentActivity />
    </div>
  );
}

// activePoll?.poll;

// <ActivePollCard
//   poll={activePoll.poll}
// />
