import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { hasPermission } from "../utils/permissions";

export default function RequirePermission({
  permission,
  fallback = "/forbidden",
}) {
  const { loading, user } = useAuth();

  if (loading) {
    return null;
  }

  const allowed = hasPermission(user?.roles ?? [], permission);

  if (!allowed) {
    return <Navigate to={fallback} replace />;
  }

  return <Outlet />;
}
