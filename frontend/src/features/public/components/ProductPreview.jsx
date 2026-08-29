import { Check, CircleDot } from "lucide-react";

import { motion } from "motion/react";

const options = [
  {
    title: "Artificial Intelligence",
    votes: 42,
    percentage: 56,
  },
  {
    title: "Cybersecurity",
    votes: 21,
    percentage: 28,
  },
  {
    title: "System Design",
    votes: 12,
    percentage: 16,
  },
];

export default function ProductPreview() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 28,
        scale: 0.985,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative mx-auto w-full max-w-3xl"
    >
      <div className="relative overflow-hidden rounded-[28px] border border-white/70 bg-white/75 p-3 shadow-[0_35px_100px_rgba(15,23,42,0.10)] backdrop-blur-xl sm:p-4">
        {/* Browser top bar */}
        <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-white/80 px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-red-300" />
            <span className="size-2.5 rounded-full bg-amber-300" />
            <span className="size-2.5 rounded-full bg-emerald-300" />
          </div>

          <div className="hidden rounded-full border border-border bg-surface px-4 py-1.5 text-[10px] text-text-muted sm:block">
            app.unimember
          </div>

          <div className="size-6 rounded-full bg-slate-100" />
        </div>

        <div className="grid gap-6 p-5 sm:p-8 md:grid-cols-[1.15fr_0.85fr]">
          {/* Poll */}
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
                Open
              </span>

              <span className="text-xs text-text-muted">Community poll</span>
            </div>

            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
              Which course should we explore next?
            </h3>

            <p className="mt-2 max-w-xl text-sm leading-6 text-text-secondary">
              One member, one vote. See the community's choice come to life.
            </p>

            <div className="mt-7 space-y-3">
              {options.map((option, index) => (
                <motion.div
                  key={option.title}
                  initial={{
                    opacity: 0,
                    x: -12,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: 0.35 + index * 0.08,
                    duration: 0.45,
                  }}
                  className={[
                    "rounded-2xl border p-4",
                    index === 0
                      ? "border-primary/25 bg-primary/4"
                      : "border-border bg-white/65",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {index === 0 ? (
                        <div className="flex size-7 items-center justify-center rounded-full bg-primary text-white">
                          <Check size={15} strokeWidth={2.5} />
                        </div>
                      ) : (
                        <CircleDot size={22} className="text-slate-300" />
                      )}

                      <span className="text-sm font-medium text-text-primary">
                        {option.title}
                      </span>
                    </div>

                    <span className="text-xs font-medium text-text-muted">
                      {option.votes}
                    </span>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      initial={{
                        width: 0,
                      }}
                      animate={{
                        width: `${option.percentage}%`,
                      }}
                      transition={{
                        delay: 0.6 + index * 0.1,
                        duration: 0.8,
                        ease: "easeOut",
                      }}
                      className="h-full rounded-full bg-primary"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Editorial stat panel */}
          <div className="flex flex-col justify-between rounded-3xl bg-slate-950 p-6 text-white sm:p-7">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                Live decision
              </p>

              <p className="mt-5 text-4xl font-semibold tracking-tight">75</p>

              <p className="mt-1 text-sm text-white/55">members have voted</p>
            </div>

            <div className="mt-12 border-t border-white/10 pt-5">
              <p className="text-sm leading-6 text-white/65">
                Every vote is recorded and the final result is announced to the
                community.
              </p>

              <div className="mt-6 flex items-center gap-2 text-xs font-medium text-white/80">
                <span className="size-2 rounded-full bg-emerald-400" />
                Voting is currently open
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[44px] bg-primary/6 blur-3xl"
      />
    </motion.div>
  );
}
