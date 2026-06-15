"use client";

import { useCallback, useMemo, useState } from "react";
import { projects } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";

export function ProjectsGrid() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const openable = useMemo(
    () =>
      projects
        .map((project, index) => ({ project, index }))
        .filter(({ project }) => !project.comingSoon)
        .map(({ index }) => index),
    [],
  );

  const close = useCallback(() => setOpenIndex(null), []);

  const step = useCallback(
    (dir: 1 | -1) => {
      setOpenIndex((current) => {
        if (current === null) return current;
        const pos = openable.indexOf(current);
        if (pos === -1) return current;
        const nextPos = (pos + dir + openable.length) % openable.length;
        return openable[nextPos];
      });
    },
    [openable],
  );

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-8 lg:grid-cols-3 lg:gap-x-10 xl:gap-x-14">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
            onOpen={() => setOpenIndex(index)}
          />
        ))}
      </div>

      <ProjectModal
        project={openIndex === null ? null : projects[openIndex]}
        onClose={close}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
        hasNav={openable.length > 1}
      />
    </>
  );
}
