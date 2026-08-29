import { useAuth } from "../hooks/useAuth";
import { hasPermission } from "../utils/permissions";

export default function Can({ permission, children, fallback = null }) {
  const { user } = useAuth();

  const allowed = hasPermission(user?.roles ?? [], permission);

  return allowed ? children : fallback;
}
