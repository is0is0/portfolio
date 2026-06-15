"use client";

import { motion } from "framer-motion";
import { timeline } from "@/lib/timeline";

export function Timeline() {
  return (
    <ol className="flex flex-col gap-3.5 md:max-w-xs">
      {timeline.map((entry, index) => (
        <motion.li
          key={`${entry.date}-${entry.title}-${index}`}
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{
            duration: 0.45,
            delay: index * 0.04,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex items-baseline gap-3.5"
        >
          <span className="w-14 shrink-0 font-mono text-micro tracking-wide text-muted">
            {entry.date}
          </span>
          <p className="text-meta leading-snug text-accent">
            <span>{entry.title}</span>
            {entry.subtitle && (
              <span className="text-muted"> · {entry.subtitle}</span>
            )}
          </p>
        </motion.li>
      ))}
    </ol>
  );
}
