import { Reveal } from "@/components/Reveal";
import { socials } from "@/lib/social";

export function Contact() {
  return (
    <Reveal
      as="footer"
      className="flex flex-col gap-6 border-t border-line/60 py-12 md:flex-row md:items-end md:justify-between md:py-16"
    >
      <div className="flex flex-col gap-2">
        <p className="text-label uppercase tracking-[0.35em] text-muted">
          Contact
        </p>
        <p className="text-lede text-ink">Let&apos;s build something.</p>
      </div>

      <nav aria-label="Social links">
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {socials.map((social) => {
            const external = social.href.startsWith("http");
            return (
              <li key={social.label}>
                <a
                  href={social.href}
                  className="iris-link text-meta"
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {social.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </Reveal>
  );
}
