import LoadingScreen from "../../../components/feedback/LoadingScreen";
import ErrorState from "../../../components/feedback/ErrorState";
import EmptyState from "../../../components/feedback/EmptyState";

import AdminStatCard from "../components/AdminStatCard";
import CurrentPollCard from "../components/CurrentPollCard";
import NotificationHealthCard from "../components/NotificationHealthCard";

import { useAdminDashboard } from "../hooks/useAdminDashboard";

export default function AdminDashboardPage() {
  const { polls, activePoll, isLoading, isError, refetch } =
    useAdminDashboard();
  if (isLoading) {
    return <LoadingScreen message="Loading admin dashboard..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Admin dashboard unavailable"
        message="We couldn't load the administration data."
        onRetry={refetch}
      />
    );
  }

  const pollItems = polls.data?.data ?? [];
  console.log(pollItems);
  const counts = {
    draft: pollItems.filter((poll) => poll.status === "DRAFT").length,

    scheduled: pollItems.filter((poll) => poll.status === "SCHEDULED").length,

    open: pollItems.filter((poll) => poll.status === "OPEN").length,

    closed: pollItems.filter((poll) => poll.status === "CLOSED").length,
  };

  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm font-medium text-primary">Administration</p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          Admin dashboard
        </h1>

        <p className="mt-2 text-text-secondary">
          Manage polls and monitor the club platform.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Draft polls" value={counts.draft} />

        <AdminStatCard
          label="Scheduled polls"
          value={counts.scheduled}
          variant="info"
        />

        <AdminStatCard
          label="Open polls"
          value={counts.open}
          variant="success"
        />

        <AdminStatCard label="Closed polls" value={counts.closed} />
      </section>

      <CurrentPollCard poll={activePoll?.data?.poll ?? null} />

      {/* <NotificationHealthCard notifications={notifications?.data ?? []} /> */}
    </div>
  );
}
