"use client";

import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import type { Project, ProjectMedia, ProjectTone } from "@/lib/projects";
import { MediaLightboxGallery } from "./MediaLightboxGallery";
import { SectionedGallery } from "./SectionedGallery";
import { ProjectMediaPlaceholder } from "./ProjectMediaPlaceholder";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasNav: boolean;
};

const ease = [0.22, 1, 0.36, 1] as const;

function Section({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="mb-3 text-label uppercase tracking-[0.25em] text-muted">
        {label}
      </p>
      {children}
    </div>
  );
}

function HeroMedia({
  tone,
  item,
}: {
  tone: ProjectTone;
  item?: ProjectMedia;
}) {
  if (!item) {
    return (
      <div className="overflow-hidden rounded-xl">
        <ProjectMediaPlaceholder tone={tone} layout="wide" />
      </div>
    );
  }

  if (item.type === "placeholder") {
    return (
      <div className="overflow-hidden rounded-xl">
        <ProjectMediaPlaceholder
          tone={item.tone}
          layout={item.layout ?? "wide"}
        />
      </div>
    );
  }

  if (item.type === "image") {
    return (
      <figure>
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
          <Image
            src={item.src}
            alt={item.alt ?? ""}
            fill
            sizes="(min-width: 1024px) 56vw, 100vw"
            className="object-cover"
          />
        </div>
        {item.caption && (
          <figcaption className="mt-3 font-mono text-micro uppercase tracking-[0.18em] text-muted">
            {item.caption}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <figure>
      <div className="overflow-hidden rounded-xl">
        <video
          src={item.src}
          poster={item.poster}
          width={item.width}
          height={item.height}
          autoPlay
          loop
          muted
          playsInline
          className="block h-full w-full object-contain"
        />
      </div>
      {item.caption && (
        <figcaption className="mt-3 font-mono text-micro uppercase tracking-[0.18em] text-muted">
          {item.caption}
        </figcaption>
      )}
    </figure>
  );
}

export function ProjectModal({
  project,
  onClose,
  onPrev,
  onNext,
  hasNav,
}: ProjectModalProps) {
  const reduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const open = project !== null;

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { body } = document;
    const scrollBarComp = window.innerWidth - body.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (scrollBarComp > 0) body.style.paddingRight = `${scrollBarComp}px`;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft" && hasNav) {
        onPrev();
      } else if (e.key === "ArrowRight" && hasNav) {
        onNext();
      } else if (e.key === "Tab") {
        const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
          'button, a[href], video, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const focusTimer = window.setTimeout(() => panelRef.current?.focus(), 60);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
      previouslyFocused?.focus?.();
    };
  }, [open, hasNav, onClose, onPrev, onNext]);

  const fade = reduceMotion
    ? { duration: 0.2 }
    : { duration: 0.5, ease };

  const heroItem = project?.media?.[0];
  const galleryItems = project?.media?.slice(1) ?? [];
  const sectionedGallery = (project?.gallerySections?.length ?? 0) > 0;
  const wideGallery = sectionedGallery || project?.galleryGrid;

  const meta = [project?.year, project?.role].filter(Boolean);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[200]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={fade}
        >
          <div
            className="absolute inset-0 overflow-y-auto overscroll-contain bg-paper/90 pt-16 pb-20 backdrop-blur-[2px]"
            onClick={onClose}
          >
            <div className="pointer-events-none fixed inset-x-0 top-0 z-[3] px-8 py-6 sm:px-12 lg:px-20 xl:px-28">
              <div className="relative pointer-events-auto">
                {hasNav && (
                  <div className="flex items-center justify-between pr-16">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPrev();
                      }}
                      className="font-mono text-micro uppercase tracking-[0.2em] text-muted transition-opacity duration-300 hover:text-ink"
                    >
                      ← Prev
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNext();
                      }}
                      className="font-mono text-micro uppercase tracking-[0.2em] text-muted transition-opacity duration-300 hover:text-ink"
                    >
                      Next →
                    </button>
                  </div>
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  className="absolute top-0 right-0 font-mono text-micro uppercase tracking-[0.2em] text-muted transition-opacity duration-300 hover:text-ink"
                >
                  Close
                </button>
              </div>
            </div>

            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              tabIndex={-1}
              className={`relative z-[2] mx-auto w-full outline-none ${
                wideGallery
                  ? "max-w-lg px-8 sm:max-w-xl md:max-w-4xl md:px-12 lg:max-w-6xl lg:px-20 xl:max-w-7xl xl:px-28"
                  : "max-w-lg px-8 sm:max-w-xl md:max-w-3xl md:px-12 lg:max-w-5xl lg:px-20 xl:max-w-6xl xl:px-28"
              }`}
              onClick={(e) => e.stopPropagation()}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
              transition={fade}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={project.title}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                  transition={fade}
                  className="flex flex-col gap-12 pb-8 md:gap-14 lg:gap-16"
                >
                  <header className="max-w-md pt-4 lg:max-w-xl">
                    {meta.length > 0 && (
                      <p className="mb-3 font-mono text-micro uppercase tracking-[0.2em] text-muted">
                        {meta.join(" · ")}
                      </p>
                    )}
                    <h2
                      id="project-modal-title"
                      className="font-display text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.05] tracking-tight text-iris-name"
                    >
                      {project.title}
                    </h2>
                    {project.tagline && (
                      <p className="mt-5 text-lede text-accent lg:max-w-lg">
                        {project.tagline}
                      </p>
                    )}
                  </header>

                  {sectionedGallery ? (
                    <>
                      {(project.overview?.length ?? 0) > 0 && (
                        <Section label="Overview">
                          <div className="flex max-w-2xl flex-col gap-5">
                            {project.overview!.map((para, i) => (
                              <p
                                key={i}
                                className="text-meta leading-[1.7] text-accent lg:text-body lg:leading-[1.75]"
                              >
                                {para}
                              </p>
                            ))}
                          </div>
                        </Section>
                      )}

                      <SectionedGallery sections={project.gallerySections!} />
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col gap-12 md:gap-14 lg:flex-row-reverse lg:items-start lg:gap-x-16 xl:gap-x-24">
                        <div className="lg:sticky lg:top-20 lg:w-[54%] lg:shrink-0 xl:w-[56%]">
                          <HeroMedia
                            tone={project.tone ?? "finder"}
                            item={heroItem}
                          />
                        </div>

                        <div className="flex flex-1 flex-col gap-12 md:gap-14 lg:min-w-0 lg:pt-1">
                          {(project.overview?.length ?? 0) > 0 && (
                            <Section label="Overview">
                              <div className="flex max-w-md flex-col gap-5 lg:max-w-none lg:pr-4">
                                {project.overview!.map((para, i) => (
                                  <p
                                    key={i}
                                    className="text-meta leading-[1.7] text-accent lg:text-body lg:leading-[1.75]"
                                  >
                                    {para}
                                  </p>
                                ))}
                              </div>
                            </Section>
                          )}

                          {project.stack.length > 0 && (
                            <Section label="Stack">
                              <p className="max-w-md font-mono text-micro leading-[1.9] tracking-wide text-accent lg:max-w-none">
                                {project.stack.join(" · ")}
                              </p>
                            </Section>
                          )}

                          {project.links && project.links.length > 0 && (
                            <div className="flex flex-wrap gap-x-6 gap-y-2">
                              {project.links.map((link) => (
                                <p key={link.href} className="text-meta text-accent">
                                  {link.before}
                                  <a
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="iris-link"
                                  >
                                    {link.label}
                                  </a>
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {galleryItems.length > 0 && (
                        <Section label="Screens">
                          <MediaLightboxGallery items={galleryItems} />
                        </Section>
                      )}
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
