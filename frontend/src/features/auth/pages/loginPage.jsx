import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const data = await login(form);

      const roles = data.user?.roles ?? [];

      if (roles.includes("Admin")) {
        navigate("/admin");
      } else {
        navigate("/member");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Unable to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Welcome back</h1>

      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="email"
        autoComplete="email"
      />

      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        autoComplete="current-password"
      />

      {error && <p>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
