import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { register } from "../api/auth.api";
import { getApiError } from "../../../api/errors";
export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const apiError = getApiError(error);

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
      await register(form);

      navigate("/login", {
        replace: true,
        state: {
          registered: true,
        },
      });
    } catch (err) {
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Join the CS Club</h1>

      <input
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Username"
        autoComplete="username"
      />

      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        autoComplete="email"
      />

      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        autoComplete="new-password"
      />

      {error && <p>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create account"}
      </button>
    </form>
  );
}
