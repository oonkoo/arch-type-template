import type { CompanyContent } from "@/lib/company/types"

export const content: CompanyContent = {
  about: {
    eyebrow: "About Us",
    body: "At 6ixDev, we transform ideas into impactful developments. As Toronto’s trusted real estate developers and the dedicated development arm of the 6ix Group, we manage projects from concept to completion with a strong focus on strategy, sustainability, and community value.",
    cta: { label: "About 6ixDev", href: "#about" },
    image: {
      src: "/company/6ix-dev/assets/hero.jpg",
      alt: "6ixDev — Toronto real estate development",
      width: 2400,
      height: 1600,
    },
  },
  services: {
    sectionTitle: "Our Services",
    sectionDescription:
      "End-to-end delivery — from feasibility through handover — built on market insight, meticulous planning and an uncompromising design standard.",
    categories: [
      {
        eyebrow: "Development and Strategy",
        icon: "planning",
        pills: [
          { label: "Development Management", emphasis: "solid" },
          { label: "Project Management", emphasis: "accent" },
          { label: "Market Insight", emphasis: "solid" },
          { label: "Strategic Planning", emphasis: "outlined" },
          { label: "Feasibility, Due Diligence", emphasis: "plain" },
        ],
      },
      {
        eyebrow: "Design and Execution",
        icon: "interior",
        pills: [
          { label: "Innovative Design", emphasis: "solid" },
          { label: "Residential", emphasis: "accent" },
          { label: "Commercial", emphasis: "solid" },
          { label: "Construction Oversight", emphasis: "outlined" },
          { label: "Community Consultation", emphasis: "plain" },
        ],
      },
    ],
  },
  featuredWorks: {
    sectionTitle: "Featured Works",
    projectCtaLabel: "View Project",
    allProjectsLabel: "All Projects",
    allProjectsHref: "#projects",
    initialProjectSlug: "landing-one",
    projects: [
            {
        slug: "simcoe-community",
        title: "Simcoe Community",
        shortTitle: "Simcoe Community",
        description:
          "In the heart of Durham Region, Oshawa's Simcoe Community brings thoughtfully planned residences to one of the area's fastest-growing corridors.",
        image: {
          src: "/company/6ix-dev/assets/section.webp",
          alt: "Simcoe Community — Oshawa",
          width: 2400,
          height: 1600,
        },
      },
      {
        slug: "landing-one",
        title: "Landing One",
        shortTitle: "Landing One",
        description:
          "The Landing One development in Holland Landing has received Conditional Site Plan Approval — a milestone on the way to breaking ground on a new community in Oshawa's growth corridor.",
        image: {
          src: "https://6ixdevinc.com/wp-content/uploads/2025/02/image_2024-12-10_18-47-47-1024x640.png",
          alt: "Landing One — Holland Landing development",
          width: 1024,
          height: 640,
        },
      },
      {
        slug: "leroy-residence",
        title: "Leroy Residence",
        shortTitle: "Leroy Residence",
        description:
          "A residential project on Leroy Avenue, delivered end-to-end with the same strategy, sustainability and community-value focus that drives every 6ixDev development.",
        image: {
          src: "https://6ixdevinc.com/wp-content/uploads/2025/07/75-Leroy-03-1152x1536.jpg",
          alt: "Leroy Residence — 75 Leroy",
          width: 1152,
          height: 1536,
        },
      },
    ],
  },
  team: {
    sectionTitle: "Our Team",
    description:
      "We’re a driven team of development professionals focused on identifying opportunities and delivering projects that create lasting value.",
    cta: { label: "Join Our Team", href: "#team" },
    seeAll: {
      label: "See Full\nTeam",
      href: "https://6ixdevinc.com/team/",
    },
    featured: {
      name: "Frank Taheri",
      shortName: "Frank T.",
      role: "Partner · Development Lead",
      image: {
        src: "https://6ixdevinc.com/wp-content/uploads/2025/02/FrankTaheri-e1740253503779.webp",
        alt: "Frank Taheri — Partner · Development Lead",
        width: 600,
        height: 600,
      },
    },
    members: [
      {
        name: "Behzad Lotfi",
        shortName: "Behzad L.",
        role: "Partner · Development Lead",
        image: {
          src: "https://6ixdevinc.com/wp-content/uploads/2025/05/Behzadx-e1757704125297.webp",
          alt: "Behzad Lotfi — Partner · Development Lead",
          width: 600,
          height: 600,
        },
      },
      {
        name: "Dale Downey",
        shortName: "Dale D.",
        role: "Strategic Advisor",
        image: {
          src: "https://6ixdevinc.com/wp-content/uploads/2025/10/Untitled-design-33.jpg",
          alt: "Dale Downey — Strategic Advisor",
          width: 600,
          height: 600,
        },
      },
      {
        name: "Sergey Shegay",
        shortName: "Sergey S.",
        role: "Business Development · Investor Relations",
        image: {
          src: "https://6ixdevinc.com/wp-content/uploads/2025/10/Untitled-design-32.jpg",
          alt: "Sergey Shegay — Business Development · Investor Relations",
          width: 600,
          height: 600,
        },
      },
      {
        name: "Yasmin Naserkhaki",
        shortName: "Yasmin N.",
        role: "Marketing Lead · Business Development",
        image: {
          src: "https://6ixdevinc.com/wp-content/uploads/2025/05/Yasi_Photo_Option-7-scaled.jpg",
          alt: "Yasmin Naserkhaki — Marketing Lead · Business Development",
          width: 600,
          height: 600,
        },
      },
      {
        name: "Kendall Pauls",
        shortName: "Kendall P.",
        role: "IT",
        image: {
          src: "https://6ixdevinc.com/wp-content/uploads/2025/10/Kendall_Photo_Optionm-2-1-1-scaled.jpg",
          alt: "Kendall Pauls — IT",
          width: 600,
          height: 600,
        },
      },
      {
        name: "Dr. Younes Sadat-Nejad",
        shortName: "Younes S.",
        role: "Technology Research & Development Advisor",
        image: {
          src: "https://6ixdevinc.com/wp-content/uploads/2025/10/Untitled-design-10.jpg",
          alt: "Dr. Younes Sadat-Nejad — Technology Research & Development Advisor",
          width: 600,
          height: 600,
        },
      },
      {
        name: "Amin Alibeik",
        shortName: "Amin A.",
        role: "Construction Advisor",
        image: {
          src: "https://6ixdevinc.com/wp-content/uploads/2025/10/6ixDesign-Office0055.jpg",
          alt: "Amin Alibeik — Construction Advisor",
          width: 600,
          height: 600,
        },
      },
    ],
  },
  partners: {
    sectionTitle: "Our Partners",
    description:
      "Built alongside the 6ix Group portfolio — sister brands that share our standards in design, construction and delivery.",
    items: [
      {
        name: "6ix Group",
        href: "https://6ixgroup.ca/",
        logo: {
          src: "https://6ixdevinc.com/wp-content/uploads/2025/09/6ixg.png",
          alt: "6ix Group",
          width: 400,
          height: 200,
        },
      },
      {
        name: "6ix Build",
        href: "https://6ixbuild.ca/",
        logo: {
          src: "https://6ixdevinc.com/wp-content/uploads/2025/01/aadfga.jpg",
          alt: "6ix Build",
          width: 400,
          height: 200,
        },
      },
      {
        name: "6ix Design",
        href: "https://6ixdesign.ca/",
        logo: {
          src: "https://6ixdevinc.com/wp-content/uploads/2025/01/6a.jpg",
          alt: "6ix Design",
          width: 400,
          height: 200,
        },
      },
    ],
  },
  contact: {
    sectionTitle: "Contact Us",
    heading: "Let's talk about making your story a reality.",
    cta: { label: "Start A Project", href: "mailto:info@6ixdevinc.com" },
    details: [
      {
        label: "Email",
        value: "info@6ixdevinc.com",
        href: "mailto:info@6ixdevinc.com",
      },
      {
        label: "Phone",
        value: "+1 416-449-7579",
        href: "tel:+14164497579",
      },
      {
        label: "Office",
        value: "Unit 21- 156 Duncan Mill Rd\nNorth York, ON, M3B 3N2",
      },
    ],
    backgroundImage: {
      src: "https://images.unsplash.com/photo-1602634630420-30a51ffa9326?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "",
      width: 1469,
      height: 980,
    },
  },
  primaryAction: {
    label: "Start A Project",
    href: "mailto:info@6ixdevinc.com",
  },
  socials: {
    instagram: "https://www.instagram.com/6ix_dev.inc/",
    linkedin: "https://www.linkedin.com/company/6ix-dev-inc/",
  },
  footer: {
    copyright: "© 2026 6ixDev Inc.",
  },
}
