import { Link } from "react-router-dom";
import Button from "../ui/Button";

export default function Forbidden() {
  return (
    <main className="feedback-state" role="alert">
      <h1>403</h1>

      <p>You don't have permission to access this page.</p>
      <Button>
        {" "}
        <Link to="/member">Back to dashboard</Link>
      </Button>
    </main>
  );
}
