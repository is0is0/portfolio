import { Reveal } from "@/components/Reveal";
import { Timeline } from "@/components/Timeline";

export function Hero() {
  return (
    <section className="pt-20 pb-10 md:pt-24 md:pb-14">
      <div className="grid gap-10 md:grid-cols-2 md:items-start md:gap-x-16 lg:gap-x-24">
        <div className="flex flex-col gap-5">
          <Reveal>
            <h1 className="font-display text-[clamp(1.875rem,4.5vw,3.25rem)] leading-[0.95] tracking-tight text-iris-name">
              Justin Nelson
            </h1>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="text-meta text-muted">
              AI Engineer at{" "}
              <a
                href="https://giebel-adsorber.com"
                target="_blank"
                rel="noopener noreferrer"
                className="iris-link font-semibold text-ink"
              >
                GIEBEL FilTec
              </a>
              <span className="text-muted/60"> · </span>
              Incoming UGA CS + Math
              <span className="text-muted/60"> · </span>
              Atlanta, GA, USA
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="max-w-md text-meta leading-[1.65] text-accent">
              I&apos;m interested in how intelligent interfaces can advance the
              way society works. I plan to focus on human computer interaction and design to make
              these systems legible, adoptable, and feel natural.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.08} className="md:justify-self-end">
          <Timeline />
        </Reveal>
      </div>
    </section>
  );
}
