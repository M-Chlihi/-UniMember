import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

export default function RequireRole({ allowedRoles }) {
  const { loading, user } = useAuth();

  if (loading) {
    return null;
  }

  const hasRole = user?.roles?.some((role) => allowedRoles.includes(role));

  if (!hasRole) {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
}
