"use client";

import { useMemo, type ReactNode } from "react";
import type { ProjectGallerySection, ProjectMedia } from "@/lib/projects";
import {
  GalleryGridTile,
  MediaLightboxProvider,
  type LightboxEntry,
} from "./MediaLightboxGallery";

function itemLabel(item: Exclude<ProjectMedia, { type: "placeholder" }>) {
  if (item.type === "image") {
    return item.caption ?? item.alt ?? "Untitled";
  }
  return item.caption ?? "Untitled";
}

function flattenSections(sections: ProjectGallerySection[]): LightboxEntry[] {
  const entries: LightboxEntry[] = [];
  for (const section of sections) {
    for (const item of section.media) {
      if (item.type === "placeholder") continue;
      entries.push({
        key: `${section.title}::${item.src}`,
        label: itemLabel(item),
        group: section.title,
        item,
      });
    }
  }
  return entries;
}

function SectionBlock({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-label uppercase tracking-[0.25em] text-muted">{label}</p>
      {children}
    </div>
  );
}

export function SectionedGallery({ sections }: { sections: ProjectGallerySection[] }) {
  const entries = useMemo(() => flattenSections(sections), [sections]);

  return (
    <MediaLightboxProvider entries={entries}>
      {({ setLightboxIndex }) => (
        <div className="flex flex-col gap-12 md:gap-14 lg:gap-16">
          {sections.map((section) => {
            const sectionEntries = entries
              .map((entry, globalIndex) => ({ entry, globalIndex }))
              .filter(({ entry }) => entry.group === section.title);

            return (
              <div key={section.title} className="flex flex-col gap-8 lg:gap-10">
                <SectionBlock label={section.title}>
                  {section.description && (
                    <p className="mb-8 max-w-2xl text-meta leading-[1.7] text-accent lg:mb-10 lg:text-body lg:leading-[1.75]">
                      {section.description}
                    </p>
                  )}
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {sectionEntries.map(({ entry, globalIndex }) => (
                      <GalleryGridTile
                        key={entry.key}
                        entry={entry}
                        globalIndex={globalIndex}
                        onOpen={setLightboxIndex}
                      />
                    ))}
                  </div>
                </SectionBlock>
              </div>
            );
          })}
        </div>
      )}
    </MediaLightboxProvider>
  );
}
