import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoadingScreen from "../../../components/feedback/LoadingScreen";

export default function RequireGuest() {
  const { loading, isAuthenticated, user } = useAuth();

  const location = useLocation();

  if (loading) {
    return <LoadingScreen message="Restoring your session..." />;
  }

  if (!isAuthenticated) {
    return <Outlet />;
  }

  const canAccessAdmin =
    user?.roles?.includes("Admin") || user?.roles?.includes("Editor");

  /*
   * Don't let an authenticated user
   * remain on login/register.
   */
  if (canAccessAdmin) {
    return (
      <Navigate
        to="/admin"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  return (
    <Navigate
      to="/member"
      replace
      state={{
        from: location,
      }}
    />
  );
}
