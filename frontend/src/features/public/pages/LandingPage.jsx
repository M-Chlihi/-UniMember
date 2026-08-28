import PublicNavbar from "../components/PublicNavbar";
import HeroSection from "../components/HeroSection";
import WhyCsClubSection from "../components/WhyCsClubSection";
import PollLifecycleSection from "../components/PollLifecycleSection";
import FeatureSection from "../components/FeatureSection";
import CTASection from "../components/CTASection";
import PublicFooter from "../components/PublicFooter";
import SectionLabel from "../components/SectionLabel";

import { motion } from "motion/react";

const process = [
  {
    number: "01",
    title: "Create",
    text: "A poll is prepared with clear choices and a defined voting window.",
  },
  {
    number: "02",
    title: "Vote",
    text: "Members select one option and submit one vote.",
  },
  {
    number: "03",
    title: "Decide",
    text: "The poll closes and the final result is calculated automatically.",
  },
  {
    number: "04",
    title: "Share",
    text: "The result can be communicated back to the community.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-text-primary">
      <PublicNavbar />

      <main>
        <HeroSection />

        <section
          id="how-it-works"
          className="bg-background px-5 py-24 sm:px-8 lg:px-10 lg:py-36"
        >
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <SectionLabel>How the club decides</SectionLabel>

              <motion.h2
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
                  duration: 0.65,
                }}
                className="mt-4 font-serif text-4xl leading-tight tracking-[-0.03em] sm:text-5xl"
              >
                From an idea to a decision the whole community can see.
              </motion.h2>
            </div>

            <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-4">
              {process.map((step, index) => (
                <motion.article
                  key={step.number}
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
                  className="bg-surface p-6 sm:p-8"
                >
                  <p className="text-xs font-semibold tracking-[0.18em] text-text-muted">
                    {step.number}
                  </p>

                  <h3 className="mt-12 font-serif text-2xl tracking-tight">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-text-secondary">
                    {step.text}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <WhyCsClubSection />

        <PollLifecycleSection />

        <FeatureSection />

        <CTASection />
      </main>

      <PublicFooter />
    </div>
  );
}
