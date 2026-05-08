import type { CompanyConfig, ThemeTokens } from "@/lib/company/types"
import { content } from "./content"

const light: ThemeTokens = {
  background: "oklch(0.985 0.005 85)",
  foreground: "oklch(0.22 0.02 50)",
  card: "oklch(0.98 0.006 85)",
  cardForeground: "oklch(0.22 0.02 50)",
  popover: "oklch(0.99 0.004 85)",
  popoverForeground: "oklch(0.22 0.02 50)",
  primary: "oklch(0.48 0.09 45)",
  primaryForeground: "oklch(0.985 0.005 85)",
  secondary: "oklch(0.94 0.012 80)",
  secondaryForeground: "oklch(0.28 0.03 50)",
  muted: "oklch(0.94 0.01 85)",
  mutedForeground: "oklch(0.5 0.02 60)",
  accent: "oklch(0.9 0.03 80)",
  accentForeground: "oklch(0.28 0.03 50)",
  destructive: "oklch(0.55 0.2 25)",
  border: "oklch(0.89 0.012 80)",
  input: "oklch(0.89 0.012 80)",
  ring: "oklch(0.48 0.09 45)",
  chart1: "oklch(0.72 0.09 45)",
  chart2: "oklch(0.6 0.04 80)",
  chart3: "oklch(0.45 0.02 60)",
  chart4: "oklch(0.35 0.01 60)",
  chart5: "oklch(0.25 0.015 60)",
  sidebar: "oklch(0.97 0.007 85)",
  sidebarForeground: "oklch(0.22 0.02 50)",
  sidebarPrimary: "oklch(0.48 0.09 45)",
  sidebarPrimaryForeground: "oklch(0.985 0.005 85)",
  sidebarAccent: "oklch(0.93 0.015 80)",
  sidebarAccentForeground: "oklch(0.28 0.03 50)",
  sidebarBorder: "oklch(0.88 0.012 80)",
  sidebarRing: "oklch(0.48 0.09 45)",
  radius: "0.5rem",
}

export const atelierNord: CompanyConfig = {
  slug: "atelier-nord",
  name: "Atelier Nord",
  description:
    "Boutique Norwegian architecture studio designing residential and cultural spaces.",
  theme: { mode: "light-only", light },
  logo: {
    light: {
      src: "/company/atelier-nord/logo-light.svg",
      width: 160,
      height: 32,
      alt: "Atelier Nord",
    },
  },
  fonts: {
    heading: "Manrope",
    body: "Public Sans",
    mono: "Geist Mono",
  },
  content,
}
