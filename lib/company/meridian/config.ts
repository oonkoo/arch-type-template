import type { CompanyConfig, ThemeTokens } from "@/lib/company/types"
import { content } from "./content"

const light: ThemeTokens = {
  background: "oklch(0.94 0.013 75)",
  foreground: "oklch(0.2 0.01 60)",
  card: "oklch(0.9 0.022 80)",
  cardForeground: "oklch(0.2 0.01 60)",
  popover: "oklch(0.96 0.012 75)",
  popoverForeground: "oklch(0.2 0.01 60)",
  primary: "oklch(0.66 0.2 35)",
  primaryForeground: "oklch(0.985 0.005 80)",
  secondary: "oklch(0.88 0.02 75)",
  secondaryForeground: "oklch(0.22 0.012 60)",
  muted: "oklch(0.9 0.015 75)",
  mutedForeground: "oklch(0.52 0.012 60)",
  accent: "oklch(0.88 0.02 75)",
  accentForeground: "oklch(0.22 0.012 60)",
  destructive: "oklch(0.58 0.23 27)",
  border: "oklch(0.83 0.015 70)",
  input: "oklch(0.83 0.015 70)",
  ring: "oklch(0.66 0.2 35)",
  chart1: "oklch(0.66 0.2 35)",
  chart2: "oklch(0.55 0.1 60)",
  chart3: "oklch(0.45 0.015 60)",
  chart4: "oklch(0.7 0.1 80)",
  chart5: "oklch(0.3 0.012 60)",
  sidebar: "oklch(0.94 0.013 75)",
  sidebarForeground: "oklch(0.2 0.01 60)",
  sidebarPrimary: "oklch(0.66 0.2 35)",
  sidebarPrimaryForeground: "oklch(0.985 0.005 80)",
  sidebarAccent: "oklch(0.88 0.02 75)",
  sidebarAccentForeground: "oklch(0.22 0.012 60)",
  sidebarBorder: "oklch(0.83 0.015 70)",
  sidebarRing: "oklch(0.66 0.2 35)",
  radius: "0.625rem",
}

export const meridian: CompanyConfig = {
  slug: "meridian",
  name: "Meridian Studio",
  description:
    "Toronto architecture practice working at the intersection of architecture, urbanism and building technology.",
  theme: { mode: "light-only", light },
  logo: {
    light: {
      src: "/company/meridian/logo-light.svg",
      width: 160,
      height: 32,
      alt: "Meridian Studio",
    },
    mark: {
      light: {
        src: "/company/meridian/mark-light.svg",
        width: 32,
        height: 32,
        alt: "Meridian Studio",
      },
      dark: {
        src: "/company/meridian/mark-dark.svg",
        width: 32,
        height: 32,
        alt: "Meridian Studio",
      },
    },
  },
  fonts: {
    heading: "Manrope",
    body: "Public Sans",
    mono: "Geist Mono",
  },
  content,
}
