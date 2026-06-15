export type ProjectTone =
  | "finder"
  | "soral"
  | "integral"
  | "openx"
  | "voxel"
  | "pastworks";

export type ProjectMedia =
  | {
      type: "image";
      src: string;
      alt?: string;
      caption?: string;
      width?: number;
      height?: number;
      galleryFrame?: {
        background?: string;
        padding?: string;
      };
      /** Items with the same galleryRow render side by side in the screens gallery. */
      galleryRow?: string;
    }
  | {
      type: "video";
      src: string;
      poster?: string;
      caption?: string;
      width?: number;
      height?: number;
      galleryRow?: string;
    }
  | {
      type: "placeholder";
      tone: ProjectTone;
      layout?: "wide" | "tile";
      caption?: string;
      label?: string;
    };

export type ProjectLink = {
  label: string;
  href: string;
  /** Plain text shown before the linked label, e.g. "Click here to open ". */
  before?: string;
};

export type ProjectGallerySection = {
  title: string;
  description?: string;
  media: ProjectMedia[];
};

export type Project = {
  title: string;
  description: string;
  stack: string[];
  tone?: ProjectTone;
  year?: string;
  role?: string;
  comingSoon?: boolean;
  // Rich detail shown inside the popup. All optional — the modal renders
  // only the fields that are present.
  tagline?: string;
  overview?: string[];
  labels?: string[];
  media?: ProjectMedia[];
  gallerySections?: ProjectGallerySection[];
  /** Compact multi-column grid for the screens gallery instead of stacked full-width tiles. */
  galleryGrid?: boolean;
  links?: ProjectLink[];
  /** Fine-tune card cover crop when the project has a cover image. */
  coverFrame?: {
    objectPosition?: string;
    translateY?: string;
    scale?: string;
  };
};

export function getProjectCover(project: Project): string | undefined {
  const item = project.media?.find((m) => m.type === "image");
  return item?.type === "image" ? item.src : undefined;
}

export const projects: Project[] = [
  {
    title: "Finder",
    description:
      "Made for GIEBEL. Product finder for desiccant breathers. Customers go through a guided flow or chat to find a product, then send a lead or quote into Odoo. Axis is the internal version for sales, tied to CRM.",
    stack: ["Flask", "React", "Gemini", "Odoo", "Astra DB"],
    tone: "finder",
    year: "2025",
    role: "Design + Engineering",
    tagline: "Made for GIEBEL. Find the right breather easily.",
    labels: ["Full-stack", "AI", "CRM"],
    galleryGrid: true,
    media: [
      {
        type: "image",
        src: "/projects/finder/cover.jpg",
        alt: "Finder guided product selection flow",
        caption: "Guided product selection",
      },
      {
        type: "image",
        src: "/projects/finder/chat.jpg",
        alt: "Finder conversational search",
        caption: "Conversational search",
      },
      {
        type: "image",
        src: "/projects/finder/compare.jpg",
        alt: "Finder product comparison",
        caption: "Side-by-side comparison",
      },
      {
        type: "image",
        src: "/projects/finder/pressure-ratio.jpg",
        alt: "Finder pressure ratio chart",
        caption: "Pressure ratio chart",
      },
      {
        type: "image",
        src: "/projects/finder/axis-inventory.png",
        alt: "Axis inventory audit",
        caption: "Axis inventory audit",
      },
    ],
    overview: [
      "Customers can either step through a guided set of questions or just chat, and either path lands them on the right breather. When they're ready, the lead or quote goes straight into Odoo so sales picks it up where they already work.",
      "Axis is the staff side of the same tool. It pulls recent quotes, stale leads, stock, and customer history, and flags when someone is likely due for a reorder. Answers are grounded in a search layer over our own docs and past conversations, and it runs in English, German, and Chinese.",
    ],
    links: [
      {
        before: "Click here to open ",
        label: "Finder",
        href: "https://giebel-adsorber.com/releases",
      },
    ],
  },
  {
    title: "Soral",
    description:
      "Turn a 3D model into a data sheet, or start from a sheet and get a model back. You can also compare two products side by side and see if they fit together.",
    stack: [],
    tone: "soral",
    tagline: "Still in progress. Models and data sheets in one place.",
    labels: ["3D", "Tooling"],
    galleryGrid: true,
    coverFrame: {
      objectPosition: "50% 58%",
      translateY: "16%",
      scale: "1.75",
    },
    media: [
      {
        type: "image",
        src: "/projects/soral/cover.png",
        alt: "Soral home screen",
        caption: "Home screen",
      },
      {
        type: "image",
        src: "/projects/soral/ui-1.png",
        alt: "Soral data sheet editor",
        caption: "Data sheet editor",
      },
      {
        type: "image",
        src: "/projects/soral/ui-2.png",
        alt: "Soral auth screen",
        caption: "Auth screen",
      },
      {
        type: "image",
        src: "/projects/soral/ui-3.png",
        alt: "Soral library",
        caption: "Library",
      },
      {
        type: "image",
        src: "/projects/soral/ui-4.png",
        alt: "Soral datasheet output",
        caption: "Datasheet output",
      },
      {
        type: "image",
        src: "/projects/soral/ui-5.png",
        alt: "Soral datasheet output page 2",
        caption: "Datasheet output page 2",
      },
    ],
    overview: [
      "Soral is still in progress. The goal is a single workspace where engineering specs, 3D models, and data sheets stay in sync. Start from a model and get a sheet, start from a sheet and get a model, or pull from a shared library of parts and templates.",
      "The model view lets you rotate, measure, and shade, and the sheet editor sits right next to it so changes stay in sync. The library keeps your recent work, reusable templates, and real manufacturer parts to compare against.",
    ],
  },
  {
    title: "Integral",
    description:
      "Something I started in Newnan last August. I'd go into a local business, learn how they handled their work, and propose an AI workflow we thought could fit. Each one looked different. I also built Integral's site by hand as a design exercise: background, motion graphics, animations, and cards, all from scratch. No AI on the visuals.",
    stack: ["Claude", "Workflow Design", "Integration", "Consulting"],
    tone: "integral",
    year: "2025",
    role: "Founder",
    tagline: "Local businesses, custom AI workflows.",
    labels: ["AI Enablement", "Consulting", "Claude"],
    galleryGrid: true,
    media: [
      {
        type: "image",
        src: "/projects/integral/cover.png",
        alt: "Integral home screen",
        caption: "Home screen",
      },
      {
        type: "video",
        src: "/projects/integral/ui-1.mp4",
        poster: "/projects/integral/ui-1.png",
        caption: "Hero animation",
        width: 2991,
        height: 1667,
      },
      {
        type: "video",
        src: "/projects/integral/ui-2.mp4",
        poster: "/projects/integral/ui-2.png",
        caption: "Card animation 1",
        width: 856,
        height: 883,
      },
      {
        type: "video",
        src: "/projects/integral/ui-3.mp4",
        poster: "/projects/integral/ui-3.png",
        caption: "Card animation 2",
        width: 843,
        height: 877,
      },
      {
        type: "image",
        src: "/projects/integral/ui-4.png",
        alt: "Integral UI detail",
        caption: "UI detail",
        width: 858,
        height: 877,
      },
    ],
    overview: [
      "I started Integral in August 2025 in Newnan. I talked to local business owners who wanted to use AI but didn't really know where to put it, or had tried ChatGPT a few times and moved on. I spent time with each team first, just learning how work actually moved through the shop.",
      "From there I'd propose an AI workflow we thought could work for them: tasks we felt could be handed off after rounds of discernment, analysis, trials, and feedback. Some were simple. Some took longer. I just wanted it to be useful after I left.",
      "I used Integral's site as a chance to practice design too. The background, motion graphics, animations, and cards were all done by hand from scratch. No AI on the visuals.",
    ],
  },
  {
    title: "OpenX",
    description:
      "Still in progress. A simulation experiment to see how AI agents reprice and discover stocks from zero, with no human traders or price feeds in the loop. Agents still get news and data APIs, just not prices.",
    stack: ["Rust", "Axum", "Tokio", "WebSockets"],
    tone: "openx",
    tagline: "Still in progress. Agents pricing stocks from zero.",
    labels: ["Trading", "Systems"],
    media: [
      {
        type: "placeholder",
        tone: "openx",
        layout: "wide",
        label: "Order book",
        caption: "AI market mode",
      },
      {
        type: "placeholder",
        tone: "openx",
        layout: "tile",
        label: "Agents",
        caption: "Agent trading view",
      },
    ],
    overview: [
      "OpenX is still in progress. The main idea is a simulation experiment: what happens if you give AI agents a market from scratch and let them trade with no human influence? There's no outside price feed and no real-world quotes to lean on. Every asset starts at the same price, every agent gets the same capital, and the only thing moving the market is what they buy and sell.",
      "Of course they aren't flying blind. Each agent has access to news feeds and data APIs, everything except prices: filings, fundamentals, headlines, the kind of information you'd actually need to price and discover a stock. The question is whether that's enough for agents to figure out value on their own.",
      "The exchange itself is built to behave like a real one, with order books and price-time matching, but the prices are entirely emergent from agent behavior.",
    ],
  },
  {
    title: "Voxel",
    description:
      "Built for the Georgia Tech Hacker House hackathon, sponsored by Anthropic. You describe a 3D scene and Voxel tries to build it in Blender through a pipeline of specialized agents. It was early and rough, but the concept stuck.",
    stack: ["Python", "Blender", "Flask", "Claude"],
    tone: "voxel",
    year: "2025",
    role: "Hackathon",
    tagline: "Describe a room, get a Blender scene back.",
    labels: ["3D", "Agents", "Hackathon"],
    galleryGrid: true,
    media: [
      {
        type: "image",
        src: "/projects/voxel/cover.png",
        alt: "Voxel cover",
        caption: "voxel cover",
        width: 2996,
        height: 1608,
      },
      {
        type: "image",
        src: "/projects/voxel/example-world-1.png",
        alt: "Voxel example world",
        caption: "example world 1",
        width: 2940,
        height: 1912,
      },
      {
        type: "image",
        src: "/projects/voxel/texture-model-lighting-1.png",
        alt: "Voxel texture, model, and lighting generation",
        caption: "texture model lighting gen 1",
        width: 2940,
        height: 1912,
      },
    ],
    overview: [
      "I built Voxel for the Georgia Tech Hacker House hackathon, sponsored by Anthropic. The idea was what the tagline says: describe a scene in words and get something back in Blender you could actually open and edit. In practice it was very basic and very early. It took all night just to get Python script generation working reliably enough to produce anything at all.",
      "The architecture was heavily agentic. Instead of one model trying to do everything, I split the work into specialized agents for scene specification, geometry, textures, and lighting, with a coordinator agent keeping the steps in sync. Each agent owned one part of the pipeline and passed structured output to the next.",
      "We didn't get far enough for it to feel finished, but the concept was strong and a lot of it carried into Soral, where I'm still thinking about how specs, models, and generated output should stay tied together.",
    ],
  },
  {
    title: "Other Works",
    description:
      "An archive of older projects from over the years, grouped into sections. Experiments, client work, and things I started and never finished.",
    stack: [
      "After Effects",
      "Photoshop",
      "Illustrator",
      "Photography",
      "Motion Design",
    ],
    tone: "pastworks",
    tagline: "Older projects collected over the years, grouped by section.",
    labels: ["Archive"],
    media: [
      {
        type: "image",
        src: "/projects/other-works/photomanipulation/photo-1.png",
        alt: "Photomanipulation piece",
        width: 2398,
        height: 1575,
      },
    ],
    overview: [
      "Other Works is where I keep projects from earlier years that don't fit anywhere else on this page. Some are done, some aren't. They're grouped by section rather than sorted by date.",
    ],
    gallerySections: [
      {
        title: "Photomanipulation",
        description:
          "Really early photography work from 2020–2021. I shot mostly nature subjects and then heavily edited them in After Effects and Photoshop, using distorting effects and not-so-conventional methods to build surreal scenes. The mood ranged from haunting to the unknown to elation.",
        media: [
          {
            type: "image",
            src: "/projects/other-works/photomanipulation/photo-1.png",
            alt: "indigo",
            caption: "indigo",
            width: 2398,
            height: 1575,
          },
          {
            type: "image",
            src: "/projects/other-works/photomanipulation/photo-2.png",
            alt: "MOMENTS BEFORE",
            caption: "MOMENTS BEFORE",
            width: 2394,
            height: 1591,
          },
          {
            type: "image",
            src: "/projects/other-works/photomanipulation/photo-3.png",
            alt: "LOOK ABOVE 01",
            caption: "LOOK ABOVE 01",
            width: 2400,
            height: 1578,
          },
          {
            type: "image",
            src: "/projects/other-works/photomanipulation/photo-4.png",
            alt: "LOOK ABOVE 02",
            caption: "LOOK ABOVE 02",
            width: 2389,
            height: 1586,
          },
          {
            type: "image",
            src: "/projects/other-works/photomanipulation/photo-5.png",
            alt: "MOMENTS AFTER",
            caption: "MOMENTS AFTER",
            width: 2372,
            height: 1604,
          },
          {
            type: "image",
            src: "/projects/other-works/photomanipulation/photo-6.png",
            alt: "OCTOBER",
            caption: "OCTOBER",
            width: 1847,
            height: 1576,
          },
        ],
      },
      {
        title: "Illustration",
        description:
          "Fine line hand illustrations that I then digitized in Photoshop to get the result I wanted. I never start with a clear vision in mind; it all just comes as I draw. Heavy influence from neo-tribalism style tattoos.",
        media: [
          {
            type: "image",
            src: "/projects/other-works/illustration/slat.png",
            alt: "SPINE",
            caption: "SPINE",
            width: 1920,
            height: 1420,
          },
          {
            type: "image",
            src: "/projects/other-works/illustration/pgnas.png",
            alt: "CRUSH",
            caption: "CRUSH",
            width: 2000,
            height: 2000,
          },
          {
            type: "image",
            src: "/projects/other-works/illustration/phx.png",
            alt: "OTHER",
            caption: "OTHER",
            width: 2000,
            height: 2000,
          },
          {
            type: "image",
            src: "/projects/other-works/illustration/psaband5.png",
            alt: "PSA",
            caption: "PSA",
            width: 2000,
            height: 2000,
          },
          {
            type: "image",
            src: "/projects/other-works/illustration/tat.png",
            alt: "pINS & NEEDLES",
            caption: "pINS & NEEDLES",
            width: 2000,
            height: 2000,
          },
          {
            type: "image",
            src: "/projects/other-works/illustration/tellatale22.png",
            alt: "TELL A TALE",
            caption: "TELL A TALE",
            width: 2000,
            height: 2000,
          },
        ],
      },
      {
        title: "Motion Design",
        description:
          "A diverse range of work from 2020 to 2026: intros, showreels, product demo scraps, and more. Built mostly in After Effects, from 3D openers for JXCK EC, GIEBEL, and Athemyst to personal showreel cuts. Some are finished pieces, others are unfinished scraps.",
        media: [
          {
            type: "video",
            src: "/projects/other-works/motion-design/jxck-ec-intro-3d.mp4",
            caption: "JXCK EC INTRO",
          },
          {
            type: "video",
            src: "/projects/other-works/motion-design/giebel-intro-v2.mp4",
            caption: "GIEBEL intro",
          },
          {
            type: "video",
            src: "/projects/other-works/motion-design/athemyst-intro.mov",
            caption: "Athemyst intro",
          },
          {
            type: "video",
            src: "/projects/other-works/motion-design/designer-showreels.mov",
            caption: "Designer showreeLS",
          },
          {
            type: "video",
            src: "/projects/other-works/motion-design/designer-showreel-2.mov",
            caption: "Designer showreel 2",
          },
          {
            type: "video",
            src: "/projects/other-works/motion-design/unfinished-source.mp4",
            caption: "soRCE (UNFINISHED)",
          },
        ],
      },
      {
        title: "Logos & Graphics",
        description:
          "Logo marks, posters, and presentation graphics from freelance and personal projects. Includes the Voxel logo, slide templates, and layout work for clients and school.",
        media: [
          {
            type: "image",
            src: "/projects/other-works/logos-graphics/giebel-01.jpg",
            alt: "GIEBEL 01",
            caption: "GIEBEL 01",
            width: 1200,
            height: 1600,
          },
          {
            type: "image",
            src: "/projects/other-works/logos-graphics/giebel-02.jpg",
            alt: "GIEBEL 02",
            caption: "GIEBEL 02",
            width: 800,
            height: 500,
          },
          {
            type: "image",
            src: "/projects/other-works/logos-graphics/giebel-03.jpg",
            alt: "GIEBEL 03",
            caption: "GIEBEL 03",
            width: 1000,
            height: 800,
          },
          {
            type: "image",
            src: "/projects/other-works/logos-graphics/voxel-logo.png",
            alt: "Voxel logo",
            caption: "Voxel logo",
            width: 1600,
            height: 1600,
            galleryFrame: {
              background: "#ffffff",
              padding: "20%",
            },
          },
          {
            type: "image",
            src: "/projects/other-works/logos-graphics/nelo3.png",
            alt: "NeloSYS LOGO",
            caption: "NeloSYS LOGO",
            width: 2000,
            height: 2000,
          },
          {
            type: "image",
            src: "/projects/other-works/logos-graphics/slide-template-blank.png",
            alt: "NeloSys slide",
            caption: "NeloSys slide",
            width: 1920,
            height: 1080,
          },
          {
            type: "image",
            src: "/projects/other-works/logos-graphics/poster3-web.png",
            alt: "PRONGHORN POSTER",
            caption: "PRONGHORN POSTER",
            width: 1600,
            height: 2400,
          },
          {
            type: "image",
            src: "/projects/other-works/logos-graphics/img-1029-web.png",
            alt: "Diamond Ridge estates",
            caption: "Diamond Ridge estates",
            width: 1669,
            height: 2400,
          },
        ],
      },
      {
        title: "Pages",
        description:
          "Early webpage design explorations. Layout, typography, and visual direction for sites and products.",
        media: [
          {
            type: "image",
            src: "/projects/other-works/pages/giebel-webpage.png",
            alt: "COMPARISON 02",
            caption: "COMPARISON 02",
            width: 3001,
            height: 1817,
          },
          {
            type: "image",
            src: "/projects/other-works/pages/giebel-webpage-2.png",
            alt: "COMPARISON 03",
            caption: "COMPARISON 03",
            width: 2983,
            height: 1815,
          },
          {
            type: "image",
            src: "/projects/other-works/pages/giebel-webpage-3.png",
            alt: "COMPARISON 04",
            caption: "COMPARISON 04",
            width: 2992,
            height: 1811,
          },
        ],
      },
    ],
  },
];
