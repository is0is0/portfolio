"use client";

import type { ReactNode } from "react";
import type { ProjectTone } from "@/lib/projects";

type ProjectMediaPlaceholderProps = {
  tone: ProjectTone;
  layout?: "wide" | "tile";
  label?: string;
  fill?: boolean;
  className?: string;
};

const toneStyles: Record<
  ProjectTone,
  { gradient: string; decor: ReactNode }
> = {
  finder: {
    gradient:
      "radial-gradient(ellipse 70% 55% at 18% 35%, color-mix(in srgb, var(--muted) 22%, transparent) 0%, transparent 70%), radial-gradient(ellipse 55% 45% at 82% 68%, color-mix(in srgb, var(--line) 80%, transparent) 0%, transparent 65%), linear-gradient(155deg, color-mix(in srgb, var(--paper) 92%, var(--line)) 0%, var(--paper) 100%)",
    decor: (
      <>
        <div className="absolute inset-x-[12%] top-[28%] h-px bg-line/50" />
        <div className="absolute inset-x-[12%] top-[44%] h-px bg-line/35" />
        <div className="absolute inset-x-[12%] top-[60%] h-px bg-line/25" />
        <div className="absolute left-[12%] top-[22%] h-[42%] w-px bg-line/40" />
        <div className="absolute right-[28%] top-[22%] h-[42%] w-px bg-line/25" />
      </>
    ),
  },
  soral: {
    gradient:
      "radial-gradient(circle at 28% 50%, color-mix(in srgb, var(--muted) 18%, transparent) 0%, transparent 55%), radial-gradient(circle at 72% 50%, color-mix(in srgb, var(--line) 70%, transparent) 0%, transparent 50%), linear-gradient(180deg, color-mix(in srgb, var(--paper) 88%, var(--line)) 0%, var(--paper) 100%)",
    decor: (
      <>
        <div className="absolute top-[18%] bottom-[18%] left-[10%] w-[38%] rounded-sm border border-line/45 bg-paper/30" />
        <div className="absolute top-[18%] bottom-[18%] right-[10%] w-[38%] rounded-sm border border-line/30 bg-line/10" />
        <div className="absolute top-1/2 left-1/2 h-8 w-px -translate-x-1/2 -translate-y-1/2 bg-line/35" />
      </>
    ),
  },
  integral: {
    gradient:
      "radial-gradient(ellipse 65% 55% at 22% 28%, color-mix(in srgb, var(--muted) 20%, transparent) 0%, transparent 62%), radial-gradient(ellipse 50% 45% at 78% 72%, color-mix(in srgb, var(--line) 65%, transparent) 0%, transparent 58%), linear-gradient(160deg, color-mix(in srgb, var(--paper) 90%, var(--line)) 0%, var(--paper) 100%)",
    decor: (
      <>
        {[22, 38, 54, 70].map((top) => (
          <div
            key={top}
            className="absolute left-[14%] right-[42%] h-px bg-line/35"
            style={{ top: `${top}%` }}
          />
        ))}
        <div className="absolute top-[22%] bottom-[30%] right-[14%] w-[32%] rounded-sm border border-line/40 bg-paper/25" />
        <div className="absolute top-[26%] right-[18%] h-1.5 w-1.5 rounded-full bg-muted/40" />
        <div className="absolute top-[42%] right-[18%] h-1.5 w-1.5 rounded-full bg-muted/30" />
        <div className="absolute top-[58%] right-[18%] h-1.5 w-1.5 rounded-full bg-muted/25" />
      </>
    ),
  },
  openx: {
    gradient:
      "radial-gradient(ellipse 90% 70% at 50% 100%, color-mix(in srgb, var(--line) 55%, transparent) 0%, transparent 70%), linear-gradient(180deg, var(--paper) 0%, color-mix(in srgb, var(--paper) 85%, var(--line)) 100%)",
    decor: (
      <>
        {[72, 58, 44, 30].map((bottom) => (
          <div
            key={bottom}
            className="absolute left-[14%] right-[14%] h-px bg-line/30"
            style={{ bottom: `${bottom}%` }}
          />
        ))}
        <div className="absolute bottom-[30%] left-[14%] h-[42%] w-[3px] bg-muted/25" />
        <div className="absolute bottom-[44%] left-[32%] h-[28%] w-[3px] bg-muted/18" />
        <div className="absolute bottom-[58%] left-[54%] h-[14%] w-[3px] bg-muted/12" />
      </>
    ),
  },
  voxel: {
    gradient:
      "radial-gradient(ellipse 60% 50% at 50% 45%, color-mix(in srgb, var(--muted) 16%, transparent) 0%, transparent 70%), linear-gradient(160deg, color-mix(in srgb, var(--paper) 88%, var(--line)) 0%, var(--paper) 100%)",
    decor: (
      <svg
        className="absolute inset-0 h-full w-full text-line/35"
        viewBox="0 0 200 120"
        fill="none"
        aria-hidden
      >
        <path
          d="M100 28 L148 52 L148 88 L100 112 L52 88 L52 52 Z"
          stroke="currentColor"
          strokeWidth="0.75"
        />
        <path
          d="M100 28 L100 64 M100 64 L148 88 M100 64 L52 88 M100 64 L100 112"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.6"
        />
      </svg>
    ),
  },
  pastworks: {
    gradient:
      "linear-gradient(180deg, color-mix(in srgb, var(--paper) 96%, var(--line)) 0%, color-mix(in srgb, var(--paper) 84%, var(--muted)) 100%)",
    decor: (
      <>
        <div className="absolute inset-x-[16%] top-[30%] h-px bg-line/20" aria-hidden />
        <div className="absolute inset-x-[24%] top-[50%] h-px bg-line/15" aria-hidden />
        <div className="absolute inset-x-[20%] top-[70%] h-px bg-line/10" aria-hidden />
      </>
    ),
  },
};

export function ProjectMediaPlaceholder({
  tone,
  layout = "tile",
  label,
  fill = false,
  className = "",
}: ProjectMediaPlaceholderProps) {
  const { gradient, decor } = toneStyles[tone];
  const aspect = layout === "wide" ? "aspect-[16/9]" : "aspect-[4/3]";

  return (
    <div
      className={`relative overflow-hidden ${fill ? "h-full w-full" : `w-full ${aspect}`} ${className}`}
      style={{ background: gradient }}
      aria-hidden={!label}
    >
      {decor}
      {label && (
        <span className="absolute bottom-3 left-3 font-mono text-[9px] uppercase tracking-[0.2em] text-muted/80">
          {label}
        </span>
      )}
    </div>
  );
}
