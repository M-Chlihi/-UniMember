import { BarChart3, CheckCircle2, Mail } from "lucide-react";

import { motion } from "motion/react";

import SectionLabel from "./SectionLabel";

const features = [
  {
    icon: CheckCircle2,
    title: "Transparent voting",
    text: "Members know when a poll is open, what they are voting on, and when voting has ended.",
  },
  {
    icon: BarChart3,
    title: "Clear results",
    text: "The final outcome is calculated from the actual votes instead of relying on manual reporting.",
  },
  {
    icon: Mail,
    title: "Automatic announcements",
    text: "Poll-result announcements can be delivered to the club community after the poll closes.",
  },
];

export default function FeatureSection() {
  return (
    <section className="bg-surface px-5 py-24 sm:px-8 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <SectionLabel>Built around participation</SectionLabel>

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
            className="mt-5 font-serif text-4xl leading-tight tracking-[-0.03em] sm:text-5xl"
          >
            Simple for members. Powerful for the people running the club.
          </motion.h2>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.article
                key={feature.title}
                initial={{
                  opacity: 0,
                  y: 18,
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
                className="bg-background p-7 sm:p-9"
              >
                <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon size={19} />
                </div>

                <h3 className="mt-14 font-serif text-2xl tracking-tight">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-text-secondary">
                  {feature.text}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
