import { useState } from "react";

import Input from "../../../components/ui/input";
import Button from "../../../components/ui/Button";

export default function LoginForm({
  onSubmit,
  submitting = false,
  error = "",
}) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setFieldErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = {};

    if (!form.email.trim()) {
      errors.email = "Email is required.";
    }

    if (!form.password) {
      errors.password = "Password is required.";
    }

    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      return;
    }

    await onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {error && (
        <div
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      <Input
        id="login-email"
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        autoComplete="email"
        autoCapitalize="none"
        autoCorrect="off"
        placeholder="you@example.com"
        error={fieldErrors.email}
        disabled={submitting}
      />

      <Input
        id="login-password"
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        autoComplete="current-password"
        placeholder="Enter your password"
        error={fieldErrors.password}
        disabled={submitting}
      />

      <Button type="submit" fullWidth size="lg" loading={submitting}>
        Sign in
      </Button>
    </form>
  );
}
