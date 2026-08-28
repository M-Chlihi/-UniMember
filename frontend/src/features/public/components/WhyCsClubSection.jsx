import { motion } from "motion/react";
import SectionLabel from "./SectionLabel";

const principles = [
  {
    number: "01",
    title: "One member, one vote.",
    description:
      "Every member gets a clear and equal opportunity to participate in the decisions that shape the club.",
  },
  {
    number: "02",
    title: "Decisions stay visible.",
    description:
      "Polls move through a clear lifecycle, from creation to voting to published results.",
  },
  {
    number: "03",
    title: "Results reach the community.",
    description:
      "When a poll closes, its result can be communicated directly to the people who participated.",
  },
];

export default function WhyCsClubSection() {
  return (
    <section
      id="why-cs-club"
      className="bg-slate-950 px-5 py-24 text-white sm:px-8 lg:px-10 lg:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div>
            <SectionLabel>Why CS Club</SectionLabel>

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
              className="mt-5 max-w-xl font-serif text-4xl leading-[1.02] tracking-[-0.03em] sm:text-5xl lg:text-6xl"
            >
              Decisions should feel like something the whole community owns.
            </motion.h2>

            <p className="mt-6 max-w-lg text-sm leading-7 text-white/55 sm:text-base">
              The platform brings the club's participation process into one
              clear experience — from creating the question to sharing the final
              result.
            </p>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {principles.map((principle, index) => (
              <motion.article
                key={principle.number}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.55,
                }}
                className="grid gap-5 py-8 sm:grid-cols-[80px_1fr] sm:py-10"
              >
                <p className="text-xs font-semibold tracking-[0.18em] text-white/35">
                  {principle.number}
                </p>

                <div>
                  <h3 className="font-serif text-2xl tracking-tight sm:text-3xl">
                    {principle.title}
                  </h3>

                  <p className="mt-3 max-w-xl text-sm leading-7 text-white/50">
                    {principle.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
