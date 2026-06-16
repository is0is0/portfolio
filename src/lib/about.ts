export type AboutSection = {
  label: string;
  body?: string;
  items?: string[];
};

export const aboutSections: AboutSection[] = [
  {
    label: "Background",
    body:
      "Jamaican immigrant, first-gen, and now a US citizen. I'm self-taught across every creative outlet I use today and bring them together in sync and harmony to create.",
  },
  {
    label: "Earlier",
    body:
      "Built my first computer at 8, tinkered with Raspberry Pis, created and ran Java Minecraft servers, and spent elementary school playing and building around video games.",
  },
  {
    label: "Now",
    body:
      "Building up GIEBEL internationally. After graduating high school this May, I'm spending summer '26 working on GIEBEL infrastructure, travelling, and collaborating on a project with a new friend.",
  },
  {
    label: "Interested in",
    body:
      "Artificial intelligence, human computer interaction, design, discrete mathematics, music production, hardware, society, psychology, and philosophy.",
  },
];

export const awards: string[] = [
  "Innovation at Work (National STEM Society)",
  "State of Georgia Merit Certificate",
  "College Board National Recognition Award",
  "AP Scholar Award",
  "Most Innovative (Nelosys)",
];

export const funFacts: string[] = [
  "I used to play academy soccer.",
  "I reached the top 1% of players across several game titles on leaderboards.",
  "I started making content at 7, which led to owning gaming organizations during COVID and eventually freelance creativity in the online community across video editing, motion design, design, and photography.",
  "I used to work in my parents' Jamaican restaurant during COVID as a kid.",
  "I make, produce, and record my own music for fun.",
];
