import { useEffect, useState } from "react";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Menu, X } from "lucide-react";
import BrandLogo from "../../features/public/brand/brandLogo";

import Navigation from "./Navigation";

export default function MobileNavigation() {
  const [open, setOpen] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  const closeMenu = () => {
    setOpen(false);
  };

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
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex size-10 items-center justify-center rounded-full text-text-primary transition hover:bg-slate-100 lg:hidden"
        aria-label="Open navigation"
        aria-controls="mobile-navigation"
        aria-expanded={open}
      >
        <Menu size={20} strokeWidth={1.8} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] lg:hidden  bg"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          >
            <button
              type="button"
              aria-label="Close navigation"
              onClick={closeMenu}
              className="absolute inset-0 bg-slate-950/30 backdrop-blur-sm"
            />

            <motion.aside
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className="absolute left-0 top-0 flex w-[min(86vw,20rem)] flex-col bg-surface px-5 pb-6 pt-5 shadow-[18px_0_50px_rgba(15,23,42,0.12)]"
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      x: "-100%",
                    }
              }
              animate={{
                x: 0,
              }}
              exit={
                shouldReduceMotion
                  ? undefined
                  : {
                      x: "-100%",
                    }
              }
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="flex items-center justify-between border-b border-border pb-4 ">
                <BrandLogo size="md" onClick={closeMenu} />

                <button
                  type="button"
                  onClick={closeMenu}
                  className="inline-flex size-10 items-center  justify-center rounded-full text-text-secondary transition hover:bg-slate-100 hover:text-text-primary"
                  aria-label="Close navigation"
                >
                  <X size={19} strokeWidth={1.8} />
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto py-6 ">
                <Navigation onNavigate={closeMenu} />
              </div>

              <div className="border-t border-border   pt-4 text-xs leading-5 text-text-muted">
                Connect. Participate. Decide together.
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
