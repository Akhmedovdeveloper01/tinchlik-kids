"use client";

import { motion, useReducedMotion } from "framer-motion";

const ARCS = [
  { color: "#EF9FC8", r: 140 },
  { color: "#FFD84D", r: 122 },
  { color: "#3BA55C", r: 104 },
  { color: "#2F6FB5", r: 86 },
  { color: "#C9B8F2", r: 68 },
];

export function Rainbow({ className = "" }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 320 170"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      {ARCS.map((arc, i) => (
        <motion.path
          key={arc.color}
          d={`M ${160 - arc.r} 170 A ${arc.r} ${arc.r} 0 0 1 ${160 + arc.r} 170`}
          stroke={arc.color}
          strokeWidth="16"
          strokeLinecap="round"
          initial={reduceMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: reduceMotion ? 0 : 1.1,
            delay: reduceMotion ? 0 : 0.15 * i,
            ease: "easeOut",
          }}
        />
      ))}
    </svg>
  );
}
