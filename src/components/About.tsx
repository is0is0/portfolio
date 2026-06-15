"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { aboutSections, awards, funFacts } from "@/lib/about";

const fade = {
  initial: { opacity: 0, y: 8 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-8% 0px" },
};

const ease = [0.22, 1, 0.36, 1] as const;

function AboutBlock({
  label,
  delay,
  children,
}: {
  label: string;
  delay: number;
  children: ReactNode;
}) {
  return (
    <div>
      <motion.p
        className="mb-2 text-label uppercase tracking-[0.25em] text-muted"
        {...fade}
        transition={{ duration: 0.5, delay, ease }}
      >
        {label}
      </motion.p>
      {children}
    </div>
  );
}

const sectionStep = 0.08;

export function About() {
  const factsBase = aboutSections.length * sectionStep;

  return (
    <div className="grid gap-10 md:grid-cols-2 md:items-start md:gap-x-16 lg:gap-x-24 xl:gap-x-32">
      <div className="flex max-w-md flex-col gap-8">
        {aboutSections.map((section, sectionIndex) => {
          const sectionDelay = sectionIndex * sectionStep;

          return (
            <AboutBlock key={section.label} label={section.label} delay={sectionDelay}>
              {section.body && (
                <motion.p
                  className="text-meta leading-[1.7] text-accent"
                  {...fade}
                  transition={{
                    duration: 0.55,
                    delay: sectionDelay + 0.04,
                    ease,
                  }}
                >
                  {section.body}
                </motion.p>
              )}
            </AboutBlock>
          );
        })}
      </div>

      <div className="flex max-w-md flex-col gap-8 md:pt-0">
        <AboutBlock label="Fun facts" delay={factsBase + 0.08}>
          <ul className="flex flex-col gap-2">
            {funFacts.map((item, index) => (
              <motion.li
                key={item}
                className="text-meta leading-[1.7] text-accent"
                {...fade}
                transition={{
                  duration: 0.55,
                  delay: factsBase + 0.08 + 0.06 + index * 0.04,
                  ease,
                }}
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </AboutBlock>

        <AboutBlock
          label="Awards"
          delay={factsBase + 0.08 + funFacts.length * 0.04 + 0.08}
        >
          <ul className="flex flex-col gap-2">
            {awards.map((item, index) => (
              <motion.li
                key={item}
                className="text-meta leading-[1.7] text-accent"
                {...fade}
                transition={{
                  duration: 0.55,
                  delay:
                    factsBase +
                    0.08 +
                    funFacts.length * 0.04 +
                    0.08 +
                    0.06 +
                    index * 0.04,
                  ease,
                }}
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </AboutBlock>
      </div>
    </div>
  );
}
