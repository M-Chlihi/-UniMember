import { useParams } from "react-router-dom";

import LoadingScreen from "../../../components/feedback/LoadingScreen";
import ErrorState from "../../../components/feedback/ErrorState";
import EmptyState from "../../../components/feedback/EmptyState";

import { usePoll } from "../../polls/hooks/usePoll";
import { usePollResults } from "../hooks/usePollResults";

import ResultsHeader from "../components/ResultsHeader";
import WinnerCard from "../components/WinnerCard";
import ResultsList from "../components/ResultsList";
import TieNotice from "../components/TieNotice";

export default function PollResultsPage() {
  const { pollId } = useParams();

  const pollQuery = usePoll(pollId);
  const resultsQuery = usePollResults(pollId);

  if (pollQuery.isLoading || resultsQuery.isLoading) {
    return <LoadingScreen message="Loading poll results..." />;
  }

  if (pollQuery.isError || resultsQuery.isError) {
    return (
      <ErrorState
        title="Results unavailable"
        message={
          resultsQuery.error?.response?.data?.message ||
          "We couldn't load the poll results."
        }
        onRetry={() => {
          pollQuery.refetch();
          resultsQuery.refetch();
        }}
      />
    );
  }

  const poll = pollQuery.data?.data;
  const results = resultsQuery.data?.data;
  if (!poll || !resultsQuery.data) {
    return (
      <EmptyState
        title="Results unavailable"
        message="We couldn't find the results for this poll."
      />
    );
  }

  if (poll.status !== "CLOSED") {
    return (
      <EmptyState
        title="Results are not available yet"
        message="Final results will be available once the poll closes."
      />
    );
  }

  return (
    <div className="space-y-8">
      <ResultsHeader poll={poll} results={resultsQuery.data} />

      {resultsQuery.data.tie && <TieNotice />}

      {resultsQuery.data.winner && !resultsQuery.data.isTie && (
        <WinnerCard winner={resultsQuery.data.winner} />
      )}

      <ResultsList options={resultsQuery.data.results} />
    </div>
  );
}
