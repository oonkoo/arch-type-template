/**
 * Each token is a raw CSS colour string (`oklch(...)`, `hsl(...)`, `#hex`),
 * written verbatim into a `<style>` tag as a CSS custom-property value.
 * Shape mirrors the shadcn token set declared in `app/globals.css`.
 */
export type ThemeTokens = {
  background: string
  foreground: string
  card: string
  cardForeground: string
  popover: string
  popoverForeground: string
  primary: string
  primaryForeground: string
  secondary: string
  secondaryForeground: string
  muted: string
  mutedForeground: string
  accent: string
  accentForeground: string
  destructive: string
  border: string
  input: string
  ring: string
  chart1: string
  chart2: string
  chart3: string
  chart4: string
  chart5: string
  sidebar: string
  sidebarForeground: string
  sidebarPrimary: string
  sidebarPrimaryForeground: string
  sidebarAccent: string
  sidebarAccentForeground: string
  sidebarBorder: string
  sidebarRing: string
  radius: string
}

export type LogoAsset = {
  src: string
  width: number
  height: number
  alt?: string
}

export type CompanyMode = "system" | "light-only" | "dark-only"

export type CompanyTheme =
  | { mode: "light-only"; light: ThemeTokens; dark?: never }
  | { mode: "dark-only"; dark: ThemeTokens; light?: never }
  | { mode: "system"; light: ThemeTokens; dark: ThemeTokens }

/** Keys of socials the site chrome knows how to render. Add icon in BrandRail. */
export type SocialKey = "x" | "instagram" | "behance" | "linkedin"
export type Socials = Partial<Record<SocialKey, string>>

/** Emphasis tiers for the pill tags inside a service category card. */
export type PillEmphasis = "solid" | "accent" | "outlined" | "plain"
export type ServicePill = { label: string; emphasis: PillEmphasis }

/** Iconography shown in the top-right of each service category card. */
export type ServiceIcon =
  | "architecture"
  | "furniture"
  | "planning"
  | "interior"
  | "render"

export type ServiceCategory = {
  /** Small uppercase label at top-left of the card (e.g. "ARCHITECTURE AND INTERIOR"). */
  eyebrow: string
  icon: ServiceIcon
  pills: ServicePill[]
}

export type FeaturedProject = {
  slug: string
  /** Display name rendered as the massive headline. */
  title: string
  /** Compact label used in the bottom nav strip. */
  shortTitle: string
  description: string
  image: { src: string; alt: string; width: number; height: number }
}

export type TeamMember = {
  /** Full legal name — used for accessible labels. */
  name: string
  /** Compact label rendered inside small circles when no image is available (e.g. "Frank T."). Defaults to `name`. */
  shortName?: string
  role?: string
  image?: { src: string; alt: string; width: number; height: number }
}

export type PartnerItem = {
  /** Brand name shown beneath the logo in the cell. */
  name: string
  /** Outbound link — when set, the whole cell becomes a clickable anchor. */
  href?: string
  /** Wordmark / logo asset. When omitted, the `name` renders centered as text. */
  logo?: { src: string; alt: string; width: number; height: number }
}

export type ContactDetail = {
  /** Small uppercase label above the value (e.g. "Email", "Phone", "Office"). */
  label: string
  /** Displayed value. Use `\n` to force a line break (e.g. multi-line address). */
  value: string
  /** Optional link target — `mailto:`, `tel:`, or an https URL. */
  href?: string
}

export type CompanyContent = {
  /** Slide 01 — About Us. */
  about: {
    eyebrow: string // e.g. "ABOUT US"
    body: string
    cta: { label: string; href: string }
    /** Full-bleed background image. */
    image: { src: string; alt: string; width: number; height: number }
  }
  /** Slide 02 — Our Services. */
  services: {
    sectionTitle: string // e.g. "OUR SERVICES"
    sectionDescription: string
    categories: ServiceCategory[]
  }
  /** Slide 03 — Featured Works. */
  featuredWorks: {
    sectionTitle: string // e.g. "FEATURED WORKS"
    projectCtaLabel: string // e.g. "View Project"
    allProjectsLabel: string // e.g. "All Projects"
    allProjectsHref: string
    projects: FeaturedProject[]
    /** Which project's detail is shown first. Must match a `projects[].slug`. */
    initialProjectSlug: string
  }
  /**
   * Optional Team slide. When undefined, the SlideDeck skips the team slide for
   * this company. `members` feeds the six small circles in order; unused slots
   * render as blank cells.
   */
  team?: {
    sectionTitle: string // e.g. "Our Team" / "Our Experts"
    description: string
    cta: { label: string; href: string }
    /** CTA inside the outlined circle in the grid. Use `\n` to force a line break. */
    seeAll: { label: string; href: string }
    featured: TeamMember
    members: TeamMember[]
  }
  /**
   * Optional Partners slide — the bordered grid of partner / sister-brand cells.
   * When undefined, the SlideDeck skips the partners slide.
   */
  partners?: {
    sectionTitle: string // e.g. "Our Partners"
    description: string
    items: PartnerItem[]
  }
  /**
   * Optional Contact slide — when undefined, the SlideDeck skips it.
   * `heading` is the large display tagline; `details` becomes a row of
   * Email / Phone / Office-style blocks below it.
   */
  contact?: {
    sectionTitle: string // e.g. "Contact Us"
    heading: string
    /** Optional CTA pill — typically mirrors `primaryAction` but allows distinct copy. */
    cta?: { label: string; href: string }
    details: ContactDetail[]
    /** Optional faint full-bleed background image rendered behind the dark surface. */
    backgroundImage?: { src: string; alt: string; width: number; height: number }
  }
  /** Persistent top-right CTA (rendered on every slide). */
  primaryAction: { label: string; href: string }
  /** Shown in the left brand rail. */
  socials: Socials
  footer: { copyright: string }
}

export type CompanyConfig = {
  slug: string
  name: string
  description: string
  theme: CompanyTheme
  logo: {
    /** Full logo (mark + wordmark) — used for larger placements. */
    light: LogoAsset
    dark?: LogoAsset
    /** Icon-only mark — rendered in the brand rail and other tight spots. */
    mark?: {
      light: LogoAsset
      dark?: LogoAsset
    }
    /**
     * CSS `filter` string applied to the rendered mark when the surface it sits on is light.
     * Useful for single-colour SVGs that need darkening for contrast (e.g. `"brightness(0)"`).
     * Skipped when an explicit `mark.light` asset is provided.
     */
    lightSurfaceFilter?: string
    /** CSS `filter` applied on dark surfaces. Skipped when an explicit `mark.dark` / `logo.dark` is provided. */
    darkSurfaceFilter?: string
  }
  fonts?: {
    heading?: string
    body?: string
    mono?: string
  }
  content: CompanyContent
}
