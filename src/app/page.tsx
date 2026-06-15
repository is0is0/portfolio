import { projects } from "@/lib/projects";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { Reveal } from "@/components/Reveal";

export default function Home() {
  return (
    <main className="flex min-h-full w-full flex-col px-8 sm:px-12 lg:px-20 xl:px-28">
      <Hero />

      <section className="pb-16 md:pb-20">
        <Reveal className="mb-8 flex items-baseline justify-between md:mb-10">
          <h2 className="text-label font-normal uppercase tracking-[0.35em] text-muted">
            Work
          </h2>
          <span className="font-mono text-micro uppercase tracking-[0.2em] text-muted">
            {String(projects.length).padStart(2, "0")}
          </span>
        </Reveal>

        <ProjectsGrid />
      </section>

      <section className="pb-16 md:pb-20">
        <Reveal className="mb-8 md:mb-10">
          <h2 className="text-label font-normal uppercase tracking-[0.35em] text-muted">
            About
          </h2>
        </Reveal>

        <About />
      </section>

      <Contact />
    </main>
  );
}
