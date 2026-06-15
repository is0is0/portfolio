"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ProjectMedia } from "@/lib/projects";

const ease = [0.22, 1, 0.36, 1] as const;

type OpenableMedia = Exclude<ProjectMedia, { type: "placeholder" }>;

export type LightboxEntry = {
  key: string;
  label: string;
  group?: string;
  item: OpenableMedia;
};

const subscribeNoop = () => () => {};

function useIsClient() {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
}

function itemLabel(item: OpenableMedia) {
  if (item.type === "image") {
    return item.caption ?? item.alt ?? "Untitled";
  }
  return item.caption ?? "Untitled";
}

export function flattenMediaItems(
  items: ProjectMedia[],
  keyPrefix = "",
): LightboxEntry[] {
  return items.flatMap((item, index) => {
    if (item.type === "placeholder") return [];
    return [
      {
        key: `${keyPrefix}${item.src}-${index}`,
        label: itemLabel(item),
        item,
      },
    ];
  });
}

type ImageMedia = Extract<ProjectMedia, { type: "image" }>;

function FramedImage({
  item,
  variant,
}: {
  item: ImageMedia;
  variant: "grid" | "lightbox";
}) {
  const frame = item.galleryFrame;
  const alt = item.alt ?? item.caption ?? "";

  if (frame) {
    const inset = frame.padding ?? "18%";

    if (variant === "grid") {
      return (
        <div
          className="absolute inset-0"
          style={{ background: frame.background ?? "#ffffff" }}
        >
          <div className="absolute flex items-center justify-center" style={{ inset }}>
            <Image
              src={item.src}
              alt={alt}
              fill
              sizes="(min-width: 1280px) 15vw, (min-width: 768px) 20vw, 45vw"
              className="object-contain"
            />
          </div>
        </div>
      );
    }

    return (
      <div
        className="inline-flex items-center justify-center p-10 sm:p-14"
        style={{ background: frame.background ?? "#ffffff" }}
      >
        <Image
          src={item.src}
          alt={alt}
          width={item.width}
          height={item.height}
          priority
          className="max-h-[min(62vh,760px)] w-auto max-w-[min(72vw,520px)] object-contain"
        />
      </div>
    );
  }

  if (variant === "grid") {
    return (
      <Image
        src={item.src}
        alt={alt}
        fill
        sizes="(min-width: 1280px) 15vw, (min-width: 768px) 20vw, 45vw"
        className="object-cover"
      />
    );
  }

  if (item.width && item.height) {
    return (
      <Image
        src={item.src}
        alt={alt}
        width={item.width}
        height={item.height}
        priority
        className="max-h-[min(62vh,760px)] w-auto max-w-full object-contain"
      />
    );
  }

  return (
    <div className="relative h-[min(62vh,760px)] w-full min-w-[min(100%,640px)]">
      <Image
        src={item.src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 56vw, 92vw"
        priority
        className="object-contain"
      />
    </div>
  );
}

function GridMedia({ item }: { item: OpenableMedia }) {
  if (item.type === "image") {
    return <FramedImage item={item} variant="grid" />;
  }

  return (
    <video
      src={item.src}
      poster={item.poster}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      className="h-full w-full object-cover"
    />
  );
}

function LightboxMedia({ item }: { item: OpenableMedia }) {
  if (item.type === "image") {
    return <FramedImage item={item} variant="lightbox" />;
  }

  return (
    <video
      src={item.src}
      poster={item.poster}
      autoPlay
      loop
      muted
      playsInline
      controls
      className="max-h-[min(62vh,760px)] w-full max-w-full object-contain"
    />
  );
}

export function GalleryGridTile({
  entry,
  globalIndex,
  onOpen,
}: {
  entry: LightboxEntry;
  globalIndex: number;
  onOpen: (index: number) => void;
}) {
  return (
    <figure className="min-w-0">
      <button
        type="button"
        onClick={() => onOpen(globalIndex)}
        className="relative block aspect-square w-full cursor-pointer overflow-hidden rounded-lg border border-line/25 bg-paper text-left transition-opacity hover:opacity-95"
        aria-label={`View ${entry.label}`}
      >
        <GridMedia item={entry.item} />
      </button>
      <figcaption className="mt-2 truncate font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
        {entry.label}
      </figcaption>
    </figure>
  );
}

function PlaceholderGridTile({ item }: { item: Extract<ProjectMedia, { type: "placeholder" }> }) {
  return (
    <figure className="min-w-0 opacity-60">
      <div className="relative aspect-square overflow-hidden rounded-lg border border-line/25 bg-paper">
        <div className="flex h-full items-center justify-center p-4 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
          {item.label ?? item.caption ?? "Coming soon"}
        </div>
      </div>
      {(item.caption ?? item.label) && (
        <figcaption className="mt-2 truncate font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
          {item.caption ?? item.label}
        </figcaption>
      )}
    </figure>
  );
}

export function GalleryLightbox({
  entries,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  entries: LightboxEntry[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const entry = entries[index];
  const hasNav = entries.length > 1;
  const fade = reduceMotion ? { duration: 0.2 } : { duration: 0.5, ease };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      } else if (e.key === "ArrowLeft" && hasNav) {
        e.preventDefault();
        e.stopPropagation();
        onPrev();
      } else if (e.key === "ArrowRight" && hasNav) {
        e.preventDefault();
        e.stopPropagation();
        onNext();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [onClose, onPrev, onNext, hasNav]);

  if (!entry) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[300]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={fade}
      aria-modal="true"
      role="dialog"
      aria-label={entry.label}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-paper/90 backdrop-blur-[2px]" aria-hidden />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 py-10 sm:px-10 md:px-14">
        <motion.div
          className="pointer-events-auto relative z-[1] w-full max-w-4xl outline-none lg:max-w-5xl"
          onClick={(e) => e.stopPropagation()}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
          transition={fade}
        >
          <div className="mb-4 flex items-center justify-between">
            {hasNav ? (
              <button
                type="button"
                onClick={onPrev}
                className="font-mono text-micro uppercase tracking-[0.2em] text-muted transition-colors hover:text-ink"
              >
                ← Prev
              </button>
            ) : (
              <span aria-hidden className="w-12" />
            )}
            <button
              type="button"
              onClick={onClose}
              className="font-mono text-micro uppercase tracking-[0.2em] text-muted transition-colors hover:text-ink"
            >
              Close
            </button>
            {hasNav ? (
              <button
                type="button"
                onClick={onNext}
                className="font-mono text-micro uppercase tracking-[0.2em] text-muted transition-colors hover:text-ink"
              >
                Next →
              </button>
            ) : (
              <span aria-hidden className="w-12" />
            )}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={entry.key}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
              transition={fade}
              className="overflow-hidden rounded-xl border border-line/25 bg-paper px-4 py-4 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.45)]"
            >
              <div className="flex items-center justify-center">
                <LightboxMedia item={entry.item} />
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-5 text-center">
            {entry.group && (
              <p className="mb-1 font-mono text-micro uppercase tracking-[0.2em] text-muted">
                {entry.group}
              </p>
            )}
            <p className="font-mono text-micro uppercase tracking-[0.18em] text-accent">
              {entry.label}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function useMediaLightbox(entries: LightboxEntry[]) {
  const isClient = useIsClient();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const stepLightbox = useCallback(
    (dir: 1 | -1) => {
      setLightboxIndex((current) => {
        if (current === null || entries.length === 0) return current;
        return (current + dir + entries.length) % entries.length;
      });
    },
    [entries.length],
  );

  const lightboxPortal =
    isClient &&
    createPortal(
      <AnimatePresence>
        {lightboxIndex !== null && (
          <GalleryLightbox
            entries={entries}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={() => stepLightbox(-1)}
            onNext={() => stepLightbox(1)}
          />
        )}
      </AnimatePresence>,
      document.body,
    );

  return { lightboxIndex, setLightboxIndex, lightboxPortal };
}

export function MediaLightboxGallery({
  items,
  className = "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
}: {
  items: ProjectMedia[];
  className?: string;
}) {
  const entries = useMemo(() => flattenMediaItems(items), [items]);
  const entryIndexByItem = useMemo(() => {
    const map = new Map<OpenableMedia, number>();
    entries.forEach((entry, index) => {
      map.set(entry.item, index);
    });
    return map;
  }, [entries]);

  const { setLightboxIndex, lightboxPortal } = useMediaLightbox(entries);

  return (
    <>
      <div className={className}>
        {items.map((item, index) => {
          if (item.type === "placeholder") {
            return <PlaceholderGridTile key={`placeholder-${index}`} item={item} />;
          }

          const globalIndex = entryIndexByItem.get(item);
          if (globalIndex === undefined) return null;

          const entry = entries[globalIndex];
          return (
            <GalleryGridTile
              key={entry.key}
              entry={entry}
              globalIndex={globalIndex}
              onOpen={setLightboxIndex}
            />
          );
        })}
      </div>
      {lightboxPortal}
    </>
  );
}

export function MediaLightboxProvider({
  entries,
  children,
}: {
  entries: LightboxEntry[];
  children: (props: {
    setLightboxIndex: (index: number) => void;
  }) => ReactNode;
}) {
  const { setLightboxIndex, lightboxPortal } = useMediaLightbox(entries);

  return (
    <>
      {children({ setLightboxIndex })}
      {lightboxPortal}
    </>
  );
}
