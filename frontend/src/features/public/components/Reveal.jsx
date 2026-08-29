import { motion, useReducedMotion } from "motion/react";
import { publicMotion } from "../styles/tokens";

export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 24,
  amount = 0.2,
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              y,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount,
      }}
      transition={{
        ...publicMotion.reveal,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
