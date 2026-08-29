import { useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import LoginForm from "../componenets/loginForm";

export default function LoginPage() {
  const navigate = useNavigate();

  const location = useLocation();

  const { login } = useAuth();

  const [error, setError] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const from = location.state?.from?.pathname;

  const handleSubmit = async (credentials) => {
    setSubmitting(true);
    setError("");

    try {
      const data = await login(credentials);

      const roles = data.user?.roles ?? [];

      if (roles.includes("Admin")) {
        navigate("/admin", {
          replace: true,
        });

        return;
      }

      if (roles.includes("Editor")) {
        navigate("/admin", {
          replace: true,
        });

        return;
      }

      if (from) {
        navigate(from, {
          replace: true,
        });

        return;
      }
      const canAccessAdmin =
        roles.includes("Admin") || roles.includes("Editor");

      if (from?.startsWith("/admin") && canAccessAdmin) {
        navigate(from, {
          replace: true,
        });

        return;
      }

      if (canAccessAdmin) {
        navigate("/admin", {
          replace: true,
        });

        return;
      }
      navigate("/member", {
        replace: true,
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to sign in. Please check your credentials and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <section className="w-full max-w-md">
        <div className="rounded-xl  border-border bg-surface p-6   sm:p-8">
          <div className="mb-8">
            <p className="text-sm font-medium text-primary"> Sign in</p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-text-primary">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-text-secondary">
              Sign in to continue to University Clubs community.
            </p>
          </div>

          <LoginForm
            onSubmit={handleSubmit}
            submitting={submitting}
            error={error}
          />

          <p className="mt-6 text-center text-sm text-text-secondary">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-primary hover:underline"
            >
              Create one
            </Link>
          </p>
          <p className="mt-6 text-center text-sm text-text-secondary">
            <Link
              to="/"
              className="mt-4 inline-flex text-sm text-text-muted hover:text-text-primary"
            >
              ← Back to UniMember
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
