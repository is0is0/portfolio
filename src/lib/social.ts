export type SocialLink = {
  label: string;
  href: string;
};

export const email = "jstnnofficial@gmail.com";

export const linkedInUrl = "https://www.linkedin.com/in/justin-n-82998a292/";

export const socials: SocialLink[] = [
  { label: "Email", href: `mailto:${email}` },
  { label: "LinkedIn", href: linkedInUrl },
];
