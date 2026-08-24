import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="feedback-state">
      <h1>404</h1>

      <p>The page you're looking for doesn't exist.</p>

      <Link to="/member">Go to dashboard</Link>
    </main>
  );
}
