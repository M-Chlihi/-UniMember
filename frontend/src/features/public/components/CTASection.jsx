import { ArrowRight } from "lucide-react";

import { Link } from "react-router-dom";

import { motion } from "motion/react";

export default function CTASection() {
  return (
    <section className="px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.98,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.25,
        }}
        transition={{
          duration: 0.7,
        }}
        className="mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-slate-950 px-6 py-16 text-center text-white sm:px-10 sm:py-20 lg:px-20 lg:py-24"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
          Join the conversation
        </p>

        <h2
          className="
    mx-auto
    max-w-4xl
    font-serif
    text-[clamp(2.75rem,6vw,5.5rem)]
    leading-[0.95]
    tracking-[-0.04em]
  "
        >
          Your next decision can start with your{" "}
          <span className="italic text-white/70">vote.</span>
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
          Join UniMember platform and take part in the decisions that shape what
          the community learns and does next.
        </p>

        <div className="mt-8">
          <Link
            to="/register"
            className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-slate-950 transition-transform duration-200 hover:-translate-y-0.5"
          >
            Create your account
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
