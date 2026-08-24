import MobileNavigation from "./MobileNavigation";
import { useAuth } from "../../features/auth/hooks/useAuth";
import Button from "../ui/Button";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="lg:hidden">
            <MobileNavigation />
          </div>

          <span className="text-lg font-semibold">CS Club</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium">{user?.username}</p>

            <p className="text-xs text-text-muted">{user?.roles?.join(", ")}</p>
          </div>

          <Button variant="ghost" size="sm" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
