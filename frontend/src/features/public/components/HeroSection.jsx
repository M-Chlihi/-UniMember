import { ArrowRight, Play } from "lucide-react";

import { Link } from "react-router-dom";

import { motion } from "motion/react";

import SectionLabel from "./SectionLabel";
import ProductPreview from "./ProductPreview";

export default function HeroSection() {
  return (
    <section
      id="platform"
      className="relative overflow-hidden bg-[#f7f8fb] pb-20 pt-28 sm:pb-28 sm:pt-32 lg:pb-36 lg:pt-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-115 bg-[radial-gradient(circle_at_50%_15%,rgba(61, 64, 254, 0.12),transparent_55%)]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{
              opacity: 0,
              y: 16,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.55,
            }}
          >
            <SectionLabel>
              UniMember · University community platform
            </SectionLabel>{" "}
          </motion.div>

          {/* <motion.h1
            initial={{
              opacity: 0,
              y: 22,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.08,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mx-auto mt-5 max-w-4xl font-serif text-5xl leading-[0.96] tracking-[-0.04em] text-text-primary sm:text-6xl lg:text-8xl"
          >
            Shape what we <span className="italic">learn next.</span>
          </motion.h1> */}
          <h1
            className="
    mx-auto
    max-w-5xl
    font-serif
    text-[clamp(3.5rem,8vw,7.5rem)]
    leading-[0.9]
    tracking-[-0.055em]
    text-text-primary
  "
          >
            Shape what we <span className="italic text-brand">learn next.</span>
          </h1>
          <motion.p
            initial={{
              opacity: 0,
              y: 16,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
              duration: 0.6,
            }}
            className="mx-auto mt-6 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg"
          >
            A transparent platform built for the University Clubs community.
            Discover upcoming courses, cast your vote, and see decisions become
            shared experiences.
          </motion.p>

          <motion.div
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3,
              duration: 0.5,
            }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link
              to="/register"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-text-primary px-6 text-sm font-medium text-text-inverse shadow-lg shadow-slate-950/10 transition-transform duration-200 hover:-translate-y-0.5"
            >
              Create your account
              <ArrowRight size={16} aria-hidden="true" />
            </Link>

            <a
              href="#how-it-works"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-white/75 px-6 text-sm font-medium text-text-primary backdrop-blur transition hover:bg-white"
            >
              <Play size={14} fill="currentColor" aria-hidden="true" />
              See how it works
            </a>
          </motion.div>
        </div>

        <div className="mt-16 sm:mt-20 lg:mt-24">
          <ProductPreview />
        </div>
      </div>
    </section>
  );
}
