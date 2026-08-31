import { NavLink } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";

import { useAuth } from "../../features/auth/hooks/useAuth";
import { hasPermission } from "../../features/auth/utils/permissions";

import { navigationSections } from "./navigation.config";

export default function Navigation({ onNavigate }) {
  const { user } = useAuth();
  const shouldReduceMotion = useReducedMotion();

  const roles = user?.roles ?? [];

  const canSeeItem = (item) => {
    if (!item.permission) {
      return true;
    }

    return hasPermission(roles, item.permission);
  };

  return (
    <nav aria-label="Main navigation" className="space-y-7">
      {navigationSections.map((section) => {
        const visibleItems = section.items.filter(canSeeItem);

        if (!visibleItems.length) {
          return null;
        }

        return (
          <section
            key={section.key}
            aria-labelledby={`nav-section-${section.key}`}
          >
            <p
              id={`nav-section-${section.key}`}
              className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-text-muted"
            >
              {section.label}
            </p>

            <div className="space-y-1">
              {visibleItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.end}
                    onClick={onNavigate}
                    className="group relative block"
                  >
                    {({ isActive }) => (
                      <div
                        className={[
                          "relative flex items-center gap-3 rounded-xl px-3 py-2.5",
                          "text-sm font-medium",
                          "transition-colors duration-200",
                          isActive
                            ? "text-brand"
                            : "text-text-secondary hover:text-text-primary",
                        ].join(" ")}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="active-navigation-item"
                            className="absolute inset-0 rounded-xl bg-brand/[0.07]"
                            transition={
                              shouldReduceMotion
                                ? {
                                    duration: 0,
                                  }
                                : {
                                    type: "spring",
                                    stiffness: 420,
                                    damping: 32,
                                  }
                            }
                          />
                        )}

                        {isActive && (
                          <motion.span
                            layoutId="active-navigation-indicator"
                            className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full bg-gradient-to-b from-brand to-brand-violet"
                            transition={
                              shouldReduceMotion
                                ? {
                                    duration: 0,
                                  }
                                : {
                                    type: "spring",
                                    stiffness: 420,
                                    damping: 32,
                                  }
                            }
                          />
                        )}

                        <motion.span
                          whileHover={
                            shouldReduceMotion
                              ? undefined
                              : {
                                  scale: 1.05,
                                }
                          }
                          className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-lg"
                        >
                          <Icon
                            size={17}
                            strokeWidth={isActive ? 2.2 : 1.8}
                            aria-hidden="true"
                          />
                        </motion.span>

                        <span className="relative z-10">{item.label}</span>
                      </div>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </section>
        );
      })}
    </nav>
  );
}
