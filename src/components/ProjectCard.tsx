"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Project, ProjectTone } from "@/lib/projects";
import { getProjectCover } from "@/lib/projects";
import { ProjectMediaPlaceholder } from "./ProjectMediaPlaceholder";

type ProjectCardProps = {
  project: Project;
  index: number;
  onOpen: () => void;
};

const ease = [0.22, 1, 0.36, 1] as const;

const cardShell =
  "relative h-[132px] w-full overflow-visible sm:h-[140px]";

const edgeMaskStyle = {
  maskImage:
    "radial-gradient(ellipse 92% 88% at 50% 54%, black 38%, transparent 72%)",
  WebkitMaskImage:
    "radial-gradient(ellipse 92% 88% at 50% 54%, black 38%, transparent 72%)",
} as const;

const revealVariants = {
  rest: { clipPath: "inset(100% 0 0 0)" },
  hover: {
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 0.6, ease },
  },
};

const openVariants = {
  rest: { opacity: 0.35, rotate: 0 },
  hover: {
    opacity: 0.85,
    rotate: 90,
    transition: { duration: 0.45, ease },
  },
};

const conicOverlayVariants = {
  rest: { opacity: 0 },
  hover: {
    opacity: 0.16,
    transition: { duration: 0.55, ease },
  },
};

const gradientOverlayVariants = {
  rest: { opacity: 0 },
  hover: {
    opacity: 0.12,
    transition: { duration: 0.55, ease },
  },
};

function CardBackdrop({
  tone,
  coverSrc,
  coverFrame,
}: {
  tone: ProjectTone;
  coverSrc?: string;
  coverFrame?: Project["coverFrame"];
}) {
  const scale = coverFrame?.scale ?? "1.85";
  const translateY = coverFrame?.translateY ?? "-12%";
  const objectPosition = coverFrame?.objectPosition ?? "50% 18%";

  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={edgeMaskStyle}
      aria-hidden
    >
      <div
        className={`absolute inset-0 origin-center ${coverSrc ? "" : "scale-[1.14]"}`}
        style={
          coverSrc
            ? { transform: `scale(${scale}) translateY(${translateY})` }
            : undefined
        }
      >
        {coverSrc ? (
          <Image
            src={coverSrc}
            alt=""
            fill
            quality={90}
            sizes="(min-width: 1280px) 560px, (min-width: 1024px) 480px, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
            style={{ objectPosition }}
          />
        ) : (
          <ProjectMediaPlaceholder tone={tone} fill />
        )}
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, color-mix(in srgb, var(--paper) 97%, black) 0%, color-mix(in srgb, var(--paper) 78%, transparent) 55%, color-mix(in srgb, var(--paper) 28%, transparent) 100%)",
        }}
      />

      <motion.div
        className="absolute inset-0"
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1, transition: { duration: 0.5, ease } },
        }}
        style={{
          background:
            "linear-gradient(to top, color-mix(in srgb, var(--paper) 94%, black) 0%, color-mix(in srgb, var(--paper) 52%, transparent) 50%, transparent 100%)",
        }}
      />

      <motion.div
        className="absolute inset-0 mix-blend-soft-light"
        variants={conicOverlayVariants}
        style={{ background: "var(--conic-ambient)" }}
      />
      <motion.div
        className="absolute inset-0 mix-blend-soft-light"
        variants={gradientOverlayVariants}
        style={{
          background: "var(--iris-name-gradient)",
          backgroundSize: "300% 100%",
        }}
      />
    </div>
  );
}

function CardContent({
  project,
  dimmed = false,
}: {
  project: Project;
  dimmed?: boolean;
}) {
  const subtitle = project.tagline ?? project.description;

  return (
    <>
      <div className="flex items-baseline gap-2">
        <span className="relative inline-block min-w-0">
          <span
            className={`block truncate text-[15px] font-normal tracking-tight ${dimmed ? "text-muted" : "text-ink/90"}`}
          >
            {project.title}
          </span>
          {!dimmed && (
            <motion.span
              className="absolute inset-0 truncate text-[15px] font-normal tracking-tight text-iris-name"
              variants={revealVariants}
            >
              {project.title}
            </motion.span>
          )}
        </span>
        {!dimmed && (
          <motion.span
            aria-hidden
            className="shrink-0 font-mono text-[13px] leading-none text-accent"
            variants={openVariants}
          >
            +
          </motion.span>
        )}
        {dimmed && (
          <span className="shrink-0 font-mono text-micro uppercase tracking-[0.2em] text-muted">
            Coming soon
          </span>
        )}
      </div>

      {subtitle && (
        <p
          className={`mt-1.5 line-clamp-2 text-meta leading-[1.5] ${dimmed ? "text-accent/50" : "text-accent/80"}`}
        >
          {subtitle}
        </p>
      )}
    </>
  );
}

export function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const enterTransition = {
    duration: 0.7,
    delay: (index % 3) * 0.05,
    ease: [0.25, 0.1, 0.25, 1] as const,
  };

  const tone = project.tone ?? "finder";
  const coverSrc = getProjectCover(project);

  if (project.comingSoon) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={enterTransition}
        className={`${cardShell} opacity-45`}
        aria-disabled
      >
        <CardBackdrop tone={tone} coverSrc={coverSrc} coverFrame={project.coverFrame} />
        <div className="relative flex h-full flex-col justify-end px-4 py-3.5 sm:px-5">
          <CardContent project={project} dimmed />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={enterTransition}
    >
      <motion.button
        type="button"
        onClick={onOpen}
        aria-label={`View ${project.title}`}
        className={`${cardShell} cursor-pointer text-left`}
        initial="rest"
        animate="rest"
        whileHover="hover"
        whileFocus="hover"
      >
        <CardBackdrop tone={tone} coverSrc={coverSrc} coverFrame={project.coverFrame} />
        <div className="relative flex h-full flex-col justify-end px-4 py-3.5 sm:px-5">
          <CardContent project={project} />
        </div>
      </motion.button>
    </motion.div>
  );
}
