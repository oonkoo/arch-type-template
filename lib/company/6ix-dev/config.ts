import type { CompanyConfig, ThemeTokens } from "@/lib/company/types"
import { content } from "./content"

// Palette derived from the 6ixDev logo: muted olive primary (~#5D7054), with
// a lighter olive shade for cards/accents and near-black as the secondary
// surface colour for text and "solid" pills.
const light: ThemeTokens = {
  background: "oklch(0.95 0.01 110)",
  foreground: "oklch(0.18 0 0)",
  card: "oklch(0.9 0.018 115)",
  cardForeground: "oklch(0.18 0 0)",
  popover: "oklch(0.96 0.01 110)",
  popoverForeground: "oklch(0.18 0 0)",
  primary: "oklch(0.5 0.05 130)",
  primaryForeground: "oklch(0.96 0.01 100)",
  secondary: "oklch(0.85 0.025 120)",
  secondaryForeground: "oklch(0.2 0 0)",
  muted: "oklch(0.9 0.015 115)",
  mutedForeground: "oklch(0.48 0.01 110)",
  accent: "oklch(0.78 0.035 125)",
  accentForeground: "oklch(0.2 0 0)",
  destructive: "oklch(0.58 0.23 27)",
  border: "oklch(0.83 0.02 115)",
  input: "oklch(0.83 0.02 115)",
  ring: "oklch(0.5 0.05 130)",
  chart1: "oklch(0.5 0.05 130)",
  chart2: "oklch(0.65 0.04 125)",
  chart3: "oklch(0.4 0.04 135)",
  chart4: "oklch(0.75 0.03 115)",
  chart5: "oklch(0.3 0.03 130)",
  sidebar: "oklch(0.95 0.01 110)",
  sidebarForeground: "oklch(0.18 0 0)",
  sidebarPrimary: "oklch(0.5 0.05 130)",
  sidebarPrimaryForeground: "oklch(0.96 0.01 100)",
  sidebarAccent: "oklch(0.85 0.025 120)",
  sidebarAccentForeground: "oklch(0.2 0 0)",
  sidebarBorder: "oklch(0.83 0.02 115)",
  sidebarRing: "oklch(0.5 0.05 130)",
  radius: "0.625rem",
}

export const sixIxDev: CompanyConfig = {
  slug: "6ix-dev",
  name: "6ixDev",
  description:
    "Toronto real estate developers — the dedicated development arm of the 6ix Group.",
  theme: { mode: "light-only", light },
  logo: {
    light: {
      src: "/company/6ix-dev/logo.svg",
      width: 120,
      height: 120,
      alt: "6ixDev",
    },
    // The mark is a single-colour olive SVG. It reads fine on dark slides but washes out
    // on the light services slide — darken it to black on that surface.
    lightSurfaceFilter: "brightness(0)",
  },
  fonts: {
    heading: "Manrope",
    body: "Public Sans",
    mono: "Geist Mono",
  },
  content,
}
