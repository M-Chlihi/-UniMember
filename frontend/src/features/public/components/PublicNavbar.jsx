import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  ChevronRight,
  Menu,
  LayoutDashboard,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import BrandLogo from "../brand/brandLogo";
import { useAuth } from "../../auth/hooks/useAuth";
export default function PublicNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { loading, isAuthenticated, user } = useAuth();
  const shouldReduceMotion = useReducedMotion();
  const canAccessAdmin =
    user?.roles?.includes("Admin") || user?.roles?.includes("Editor");

  const appPath = canAccessAdmin ? "/admin" : "/member";
  const closeMenu = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.body.style.overflow = "hidden";

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";

      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={[
            "mx-auto flex h-20 max-w-7xl items-center justify-between px-5",
            "transition-all duration-300 sm:px-8 lg:px-10",
            scrolled
              ? "mt-3 h-16 max-w-6xl rounded-full border border-border/70 bg-white/80 px-5 shadow-lg shadow-slate-950/5 backdrop-blur-xl sm:px-6"
              : "",
          ].join(" ")}
        >
          {/* <Link
            to="/"
            onClick={closeMenu}
            className="relative z-[60] flex items-center"
            aria-label="CS Club home"
          >
            <span className="text-lg font-semibold tracking-tight text-text-primary">
              CS Club
            </span>
          </Link> */}
          <BrandLogo size="md" onClick={closeMenu} />
          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Primary navigation"
          >
            <a
              href="#platform"
              className="text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              Platform
            </a>

            <a
              href="#how-it-works"
              className="text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              How it works
            </a>

            <a
              href="#why-cs-club"
              className="text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              Why UniMember
            </a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {/* <Link
              to="/login"
              className="rounded-full px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              Sign in
            </Link>

            <Link
              to="/register"
              className="group inline-flex items-center gap-2 rounded-full bg-text-primary px-5 py-2.5 text-sm font-medium text-text-inverse transition-transform duration-200 hover:-translate-y-0.5"
            >
              Join the club
              <ArrowUpRight
                size={15}
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link> */}
            {loading ? (
              <div className="h-10 w-28 rounded-full bg-slate-100 animate-pulse" />
            ) : isAuthenticated ? (
              <Link
                to={appPath}
                className="group inline-flex items-center gap-2 rounded-full bg-text-primary px-5 py-2.5 text-sm font-medium text-text-inverse transition-transform duration-200 hover:-translate-y-0.5"
              >
                Open platform
                <LayoutDashboard
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-full px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
                >
                  Sign in
                </Link>

                <Link
                  to="/register"
                  className="group inline-flex items-center gap-2 rounded-full bg-text-primary px-5 py-2.5 text-sm font-medium text-text-inverse transition-transform duration-200 hover:-translate-y-0.5"
                >
                  Join UniMember
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className={[
              "relative z-[60] inline-flex size-10 items-center justify-center rounded-full",
              "border border-border bg-white/80 text-text-primary shadow-sm backdrop-blur-md",
              "md:hidden",
            ].join(" ")}
            aria-label="Open navigation"
            aria-controls="mobile-navigation"
            aria-expanded={open}
          >
            <Menu size={19} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[55] md:hidden"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label="Close navigation"
              onClick={closeMenu}
              className="absolute inset-0 cursor-default bg-slate-950/30 backdrop-blur-[2px]"
            />

            <motion.aside
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className="absolute right-0 top-0 flex h-full w-[min(88vw,24rem)] flex-col bg-white px-6 pb-8 pt-24 shadow-2xl"
              initial={shouldReduceMotion ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={shouldReduceMotion ? undefined : { x: "100%" }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <button
                type="button"
                onClick={closeMenu}
                className="absolute right-5 top-5 inline-flex size-10 items-center justify-center rounded-full border border-border text-text-primary transition hover:bg-slate-50"
                aria-label="Close navigation"
              >
                <X size={19} />
              </button>

              <div className="border-b border-border pb-6">
                <BrandLogo size="md" onClick={closeMenu} />

                <p className="mt-3 max-w-xs font-serif text-3xl leading-tight tracking-tight text-text-primary">
                  Shape what we learn next.
                </p>
              </div>

              <nav className="mt-6">
                <div className="space-y-1">
                  {[
                    ["#platform", "Platform"],
                    ["#how-it-works", "How it works"],
                    ["#why-cs-club", "Why UniMember"],
                  ].map(([href, label]) => (
                    <a
                      key={href}
                      href={href}
                      onClick={closeMenu}
                      className="group flex items-center justify-between rounded-xl px-3 py-4 text-base font-medium text-text-primary transition hover:bg-slate-50"
                    >
                      {label}

                      <ChevronRight
                        size={17}
                        className="text-text-muted transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </a>
                  ))}
                </div>
              </nav>

              <div className="mt-auto border-t border-border pt-6">
                <div className="grid gap-3">
                  {/* <Link
                    to="/login"
                    onClick={closeMenu}
                    className="flex min-h-12 items-center justify-center rounded-full border border-border px-5 text-sm font-medium text-text-primary transition hover:bg-slate-50"
                  >
                    Sign in
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-text-primary px-5 text-sm font-medium text-text-inverse"
                  >
                    Join the club
                    <ArrowUpRight size={15} />
                  </Link> */}
                  {loading ? (
                    <div className="h-10 w-28 rounded-full bg-slate-100 animate-pulse" />
                  ) : isAuthenticated ? (
                    <Link
                      to={appPath}
                      onClick={closeMenu}
                      className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-text-primary px-5 text-sm font-medium text-text-inverse"
                    >
                      Open platform
                      <LayoutDashboard size={15} />
                    </Link>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={closeMenu}
                        className="flex min-h-12 items-center justify-center rounded-full border border-border px-5 text-sm font-medium text-text-primary"
                      >
                        Sign in
                      </Link>

                      <Link
                        to="/register"
                        onClick={closeMenu}
                        className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-text-primary px-5 text-sm font-medium text-text-inverse"
                      >
                        Join the club
                        <ArrowUpRight size={15} />
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
