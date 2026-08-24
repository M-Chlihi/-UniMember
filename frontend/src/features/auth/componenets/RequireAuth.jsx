import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import LoadingScreen from "../../../components/feedback/LoadingScreen";

export default function RequireAuth() {
  const { loading, isAuthenticated } = useAuth();

  const location = useLocation();

  if (loading) {
    return <LoadingScreen message="Restoring your session..." />;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  return <Outlet />;
}
