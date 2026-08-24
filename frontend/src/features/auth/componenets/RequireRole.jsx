import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

export default function RequireRole({ allowedRoles }) {
  const { user } = useAuth();

  const hasRole = user?.roles?.some((role) => allowedRoles.includes(role));

  if (!hasRole) {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
}
