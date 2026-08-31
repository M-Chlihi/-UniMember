import { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { ChevronDown, LogOut, UserRound } from "lucide-react";

import { Link } from "react-router-dom";

import { useAuth } from "../../features/auth/hooks/useAuth";

import Avatar from "../ui/Avatar";

export default function UserMenu() {
  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  const menuRef = useRef(null);

  const roles = user?.roles ?? [];

  const primaryRole = roles.includes("Admin")
    ? "Admin"
    : roles.includes("Editor")
      ? "Editor"
      : "User";

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);

      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleLogout = async () => {
    setOpen(false);
    await logout();
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="group flex items-center gap-2 rounded-full p-1 pr-2 transition-colors  hover:bg-blue-100"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <Avatar name={user?.username} size="sm" className="bg-blue-100" />

        <div className="hidden min-w-0 text-left sm:block">
          <p className="max-w-32 truncate text-sm font-medium text-text-primary">
            {user?.username ?? "User"}
          </p>

          <p className="text-[11px] text-text-muted">{primaryRole}</p>
        </div>

        <ChevronDown
          size={15}
          className={[
            "hidden text-text-muted transition-transform duration-200 sm:block",
            open ? "rotate-180" : "",
          ].join(" ")}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: -6,
                    scale: 0.98,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 0,
                    y: -6,
                    scale: 0.98,
                  }
            }
            transition={{
              duration: 0.18,
              ease: "easeOut",
            }}
            className="absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border border-border bg-blue-50 p-2 shadow-[0_18px_50px_rgba(15,23,42,0.12)]"
          >
            <div className="border-b border-border px-3 py-3">
              <p className="truncate text-sm font-semibold text-text-primary">
                {user?.username}
              </p>

              <p className="mt-1 truncate text-xs text-text-muted">
                {user?.email}
              </p>

              <div className="mt-3 inline-flex rounded-full bg-brand/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-brand">
                {primaryRole}
              </div>
            </div>

            <div className="mt-2 space-y-1">
              <Link
                to="/profile"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-text-secondary transition-colors hover:bg-blue-100 hover:text-text-primary"
              >
                <UserRound size={17} aria-hidden="true" />
                Profile
              </Link>

              <button
                type="button"
                role="menuitem"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-text-secondary transition-colors hover:bg-red-50 hover:text-red-600"
              >
                <LogOut size={17} aria-hidden="true" />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
