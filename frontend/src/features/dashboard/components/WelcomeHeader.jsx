import { useAuth } from "../../auth/hooks/useAuth";

export default function WelcomeHeader() {
  const { user } = useAuth();

  return (
    <header>
      <p className="text-sm font-medium text-primary">University Club</p>

      <h1 className="mt-1 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
        Welcome back, {user?.username}
      </h1>

      <p className="mt-2 max-w-2xl text-text-secondary">
        Stay involved with the latest club activities, course votes, and
        community decisions.
      </p>
    </header>
  );
}
