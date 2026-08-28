import { motion } from "motion/react";
import SectionLabel from "./SectionLabel";

const lifecycle = [
  {
    number: "01",
    label: "Draft",
    text: "A poll is prepared with its question, choices, and voting window.",
  },
  {
    number: "02",
    label: "Scheduled",
    text: "The poll is published for a defined future voting period.",
  },
  {
    number: "03",
    label: "Open",
    text: "Members can participate while the voting window is active.",
  },
  {
    number: "04",
    label: "Closed",
    text: "Voting ends and the final result becomes available.",
  },
];

export default function PollLifecycleSection() {
  return (
    <section className="bg-background px-5 py-24 sm:px-8 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <div>
            <SectionLabel>A clear lifecycle</SectionLabel>

            <motion.h2
              initial={{
                opacity: 0,
                y: 24,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: 0.7,
              }}
              className="mt-5 max-w-md font-serif text-4xl leading-[1.02] tracking-[-0.03em] sm:text-5xl"
            >
              Nothing is hidden between the question and the result.
            </motion.h2>
          </div>

          <div>
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute left-[15px] top-4 hidden h-[calc(100%-32px)] w-px bg-border sm:block"
              />

              <div className="space-y-8">
                {lifecycle.map((item, index) => (
                  <motion.article
                    key={item.number}
                    initial={{
                      opacity: 0,
                      x: 18,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.2,
                    }}
                    transition={{
                      delay: index * 0.08,
                      duration: 0.55,
                    }}
                    className="relative grid gap-5 sm:grid-cols-[32px_1fr] sm:gap-6"
                  >
                    <div className="relative z-10 flex size-8 items-center justify-center rounded-full border border-border bg-background text-[10px] font-semibold text-text-secondary">
                      {item.number}
                    </div>

                    <div className="rounded-3xl border border-border bg-surface p-6 sm:p-7">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <h3 className="font-serif text-2xl tracking-tight">
                          {item.label}
                        </h3>

                        <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
                          Poll state
                        </span>
                      </div>

                      <p className="mt-3 max-w-2xl text-sm leading-7 text-text-secondary">
                        {item.text}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
