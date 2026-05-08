import type { CompanyContent } from "@/lib/company/types"

export const content: CompanyContent = {
  about: {
    eyebrow: "About Us",
    body: "Atelier Nord is a boutique Oslo practice designing residences, cultural spaces and small civic buildings rooted in the Nordic landscape.",
    cta: { label: "About Studio", href: "#about" },
    image: {
      src: "/company/atelier-nord/logo-light.svg",
      alt: "Atelier Nord — placeholder",
      width: 2400,
      height: 1600,
    },
  },
  services: {
    sectionTitle: "Our Services",
    sectionDescription:
      "A small team working in close dialogue with each client, from first sketch to final handover.",
    categories: [
      {
        eyebrow: "Buildings",
        icon: "architecture",
        pills: [
          { label: "Residential", emphasis: "solid" },
          { label: "Cultural", emphasis: "accent" },
          { label: "Civic", emphasis: "solid" },
          { label: "Restoration", emphasis: "outlined" },
          { label: "Pavilions, Gardens", emphasis: "plain" },
        ],
      },
      {
        eyebrow: "Interiors and Fit-Out",
        icon: "interior",
        pills: [
          { label: "Interior Architecture", emphasis: "solid" },
          { label: "Joinery", emphasis: "solid" },
          { label: "Lighting", emphasis: "outlined" },
          { label: "Furnishings", emphasis: "plain" },
        ],
      },
    ],
  },
  featuredWorks: {
    sectionTitle: "Selected Work",
    projectCtaLabel: "View Project",
    allProjectsLabel: "All Projects",
    allProjectsHref: "#projects",
    initialProjectSlug: "fjordhouse",
    projects: [
      {
        slug: "fjordhouse",
        title: "Fjordhouse",
        shortTitle: "Fjordhouse",
        description:
          "A pair of timber volumes cantilevered over a granite shelf, oriented to track the winter sun.",
        image: {
          src: "/company/atelier-nord/logo-light.svg",
          alt: "Fjordhouse — placeholder",
          width: 2400,
          height: 1600,
        },
      },
      {
        slug: "paper-library",
        title: "Paper Library",
        shortTitle: "Paper Library",
        description:
          "A reading room for a private archive; oak shelving, lime-washed walls, one long clerestory.",
        image: {
          src: "/company/atelier-nord/logo-light.svg",
          alt: "Paper Library — placeholder",
          width: 2400,
          height: 1600,
        },
      },
      {
        slug: "courtyard-dwelling",
        title: "Courtyard Dwelling",
        shortTitle: "Courtyard Dwelling",
        description:
          "A family home organised around an enclosed garden protected from coastal weather.",
        image: {
          src: "/company/atelier-nord/logo-light.svg",
          alt: "Courtyard Dwelling — placeholder",
          width: 2400,
          height: 1600,
        },
      },
    ],
  },
  primaryAction: { label: "Start A Project", href: "#contact" },
  socials: {
    instagram: "https://instagram.com/",
  },
  footer: {
    copyright: "© 2025 Atelier Nord AS.",
  },
}
