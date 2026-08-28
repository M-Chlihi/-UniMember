import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { register } from "../api/auth.api";

import { getApiError } from "../../../api/errors";

import RegisterForm from "../componenets/RegisterForm";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [submitting, setSubmitting] = useState(false);
  // const registered = location.state?.registered === true;
  const handleSubmit = async (formData) => {
    setSubmitting(true);
    setError("");

    try {
      await register(formData);

      navigate("/login", {
        replace: true,
        state: {
          registered: true,
        },
      });
    } catch (err) {
      const apiError = getApiError(err);

      setError(apiError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <section className="w-full max-w-md">
        <div className="rounded-xl border border-border bg-surface p-6 shadow-card sm:p-8">
          <div className="mb-8">
            <p className="text-sm font-medium text-primary">SignUp</p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-text-primary">
              Join UniMember
            </h1>

            <p className="mt-2 text-sm text-text-secondary">
              Create your UniMember account and participate in your community
            </p>
          </div>

          <RegisterForm
            onSubmit={handleSubmit}
            submitting={submitting}
            error={error}
          />

          <p className="mt-6 text-center text-sm text-text-secondary">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
