import { NavLink } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { navigationItems } from "./navigation.config";

export default function Navigation() {
  const { user } = useAuth();

  const userRoles = user?.roles ?? [];

  const visibleItems = navigationItems.filter((item) =>
    item.roles.some((role) => userRoles.includes(role)),
  );

  return (
    <nav aria-label="Main navigation" className="space-y-1">
      {visibleItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            [
              "flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-text-secondary hover:bg-slate-100 hover:text-text-primary",
            ].join(" ")
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
