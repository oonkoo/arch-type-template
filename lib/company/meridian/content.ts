import type { CompanyContent } from "@/lib/company/types"

export const content: CompanyContent = {
  about: {
    eyebrow: "About Us",
    body: "Meridian is a Toronto-based practice designing and delivering buildings at the intersection of architecture, urbanism and emerging technology.",
    cta: { label: "About Studio", href: "#about" },
    image: {
      // Placeholder: reuses the hero asset until a dedicated about.jpg is provided.
      src: "/company/meridian/assets/hero.jpg",
      alt: "Contemporary civic building at dusk",
      width: 2400,
      height: 1600,
    },
  },
  services: {
    sectionTitle: "Our Services",
    sectionDescription:
      "We provide full-service delivery from feasibility through construction administration, matched to the scale and ambition of each brief.",
    categories: [
      {
        eyebrow: "Architecture and Interior",
        icon: "architecture",
        pills: [
          { label: "Architecture Design", emphasis: "solid" },
          { label: "3D Render", emphasis: "accent" },
          { label: "CGI", emphasis: "solid" },
          { label: "Interior Design", emphasis: "outlined" },
          { label: "Constructions,", emphasis: "plain" },
          { label: "Landscape Design, Consulting", emphasis: "plain" },
        ],
      },
      {
        eyebrow: "Bespoke Furniture",
        icon: "furniture",
        pills: [
          { label: "Bespoke Furnitures", emphasis: "solid" },
          { label: "Online Store", emphasis: "solid" },
          { label: "Decor", emphasis: "outlined" },
          { label: "Material Supply", emphasis: "plain" },
        ],
      },
    ],
  },
  featuredWorks: {
    sectionTitle: "Featured Works",
    projectCtaLabel: "View Project",
    allProjectsLabel: "All Projects",
    allProjectsHref: "#projects",
    initialProjectSlug: "dallas-ecolodge",
    projects: [
      {
        slug: "dallas-ecolodge",
        title: "Dallas Ecolodge",
        shortTitle: "Dallas Ecolodge",
        description:
          "This area is a short description for the project. This text paragraph just a sample.",
        image: {
          src: "/company/meridian/assets/hero.jpg",
          alt: "Dallas Ecolodge — timber dwellings set into a hillside",
          width: 2400,
          height: 1600,
        },
      },
      {
        slug: "torres-villa",
        title: "Torres Villa",
        shortTitle: "Torres Villa",
        description:
          "A private residence organised around a courtyard, designed for year-round coastal weather.",
        image: {
          src: "/company/meridian/assets/hero.jpg",
          alt: "Torres Villa",
          width: 2400,
          height: 1600,
        },
      },
      {
        slug: "alexs-estate",
        title: "Alex's Estate",
        shortTitle: "Alex's Estate",
        description:
          "A timber-and-stone estate with a continuous roofline tracking the ridge of the site.",
        image: {
          src: "/company/meridian/assets/hero.jpg",
          alt: "Alex's Estate",
          width: 2400,
          height: 1600,
        },
      },
      {
        slug: "olso-college",
        title: "Olso College",
        shortTitle: "Olso College",
        description:
          "A teaching and research building clad in low-carbon engineered timber.",
        image: {
          src: "/company/meridian/assets/hero.jpg",
          alt: "Olso College",
          width: 2400,
          height: 1600,
        },
      },
      {
        slug: "c16-apartment",
        title: "C16 Apartment",
        shortTitle: "C16 Apartment",
        description:
          "Sixteen-unit residential building with a double-skin façade modulating prevailing winds.",
        image: {
          src: "/company/meridian/assets/hero.jpg",
          alt: "C16 Apartment",
          width: 2400,
          height: 1600,
        },
      },
    ],
  },
  primaryAction: { label: "Start A Project", href: "#contact" },
  socials: {
    x: "https://x.com/",
    instagram: "https://instagram.com/",
    behance: "https://www.behance.net/",
  },
  footer: {
    copyright: "© 2025 Meridian Studio Inc.",
  },
}
