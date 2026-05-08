# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Next.js dev server with Turbopack.
- `npm run build` / `npm run start` — production build / serve.
- `npm run lint` — ESLint (flat config, extends `eslint-config-next` core-web-vitals + TypeScript).
- `npm run typecheck` — `tsc --noEmit` (strict mode).
- `npm run format` — Prettier over `**/*.{ts,tsx}`. Config (`.prettierrc`): `semi: false`, `singleQuote: false`, `printWidth: 80`, `tabWidth: 2`, `trailingComma: "es5"`. Match this style when hand-writing snippets so a later `format` run produces no diff.
- `npx shadcn@latest add <component>` — add a shadcn/ui component; it lands in `components/ui/`.

No test framework is configured.

## Stack

- **Next.js 16** (App Router, RSC enabled) on **React 19**.
- **Tailwind CSS v4** via `@tailwindcss/postcss`. There is no `tailwind.config.*`; Tailwind is imported directly from CSS (`@import "tailwindcss"`, `@import "shadcn/tailwind.css"` — note: `shadcn` is a runtime dep, not just a CLI). Colour tokens are **injected at runtime** by `<CompanyTheme />` (see "Company theme system" below) — `app/globals.css` only keeps the `@custom-variant`, `@theme inline` mapping, and `@layer base` rules.
- **shadcn/ui** configured with the `radix-nova` style (see `components.json`), `baseColor: neutral`, RSC on, TSX on, and `remixicon` as the icon library.
- **radix-ui** is installed as the unified package — import primitives like `import { Slot } from "radix-ui"` (namespace-style), not from `@radix-ui/react-*` subpackages.
- **next-themes** drives light/dark via a `class` attribute on `<html>`.
- **framer-motion** powers slide transitions and the brand-rail expand/collapse. Use it for any new motion rather than CSS transitions where the work spans enter/exit.

## Architecture notes

- Path alias `@/*` resolves to the project root (see `tsconfig.json`). shadcn aliases in `components.json`: `@/components`, `@/components/ui`, `@/lib`, `@/lib/utils`, `@/hooks`.
- `lib/utils.ts` exports `cn()` = `twMerge(clsx(...))`. Always use this for conditional class composition so Tailwind conflicts resolve correctly.
- Component variants use `class-variance-authority` (`cva`). See `components/ui/button.tsx` for the canonical pattern: a `cva(...)` block, a `Variant Props<typeof …>` type, and an `asChild` prop that swaps the host element for `Slot.Root`. Expose variants via `data-variant` / `data-size` / `data-slot` attributes — other components rely on these selectors (e.g. `in-data-[slot=button-group]:…`).
- Prettier is configured with `prettier-plugin-tailwindcss` and is told about project helpers via `tailwindFunctions: ["cn", "cva"]` — class strings inside `cn(...)` and `cva(...)` get sorted automatically. Keep the list in `.prettierrc` in sync when you add new class-accepting helpers.
- `components/theme-provider.tsx` wraps `next-themes` and registers a global `d`-key hotkey to toggle dark mode. The hotkey deliberately ignores modifier keys and typing targets (`input`, `textarea`, `select`, `contentEditable`) — preserve that guard if you touch it.
- `app/layout.tsx` loads three Google fonts (`Manrope` → `--font-heading`, `Public_Sans` → `--font-sans`, `Geist_Mono` → `--font-mono`) and applies their CSS variables on `<html>`. When adding typography utilities, reference these variables rather than hardcoding font families.
- `suppressHydrationWarning` on `<html>` is required by `next-themes` to avoid class-mismatch warnings on first paint — don't remove it.

## Company theme system

This is a pitch template: the same page structure is re-skinned per architecture client. Everything client-specific lives under `lib/company/<slug>/` and `public/company/<slug>/`.

- **Active company** is chosen by `NEXT_PUBLIC_COMPANY` at build/run time (see `.env.example`). `lib/company/active.ts` maps the slug to a `CompanyConfig`; unknown / missing → `DEFAULT_COMPANY` (currently `atelier-nord`). Currently registered slugs: `atelier-nord`, `meridian`, `6ix-dev`. Because `NEXT_PUBLIC_*` is inlined at build, `activeCompany` is effectively a static import.
- **Reading the active company:**
  - Server or client: `import { activeCompany } from "@/lib/company/active"`.
  - Client components may prefer the `useCompany()` sugar hook from `hooks/use-company.ts` (no provider — it just returns the static import; room to swap in a context later without changing callers).
- **`CompanyConfig` shape** (`lib/company/types.ts`): `theme` is a discriminated union keyed by `mode` — `"light-only"` (only `light` tokens), `"dark-only"` (only `dark` tokens), or `"system"` (both required). `content` is a fully-typed tree (nav / hero / services / projects / contact / footer). TypeScript will flag any company missing a required content field.
- **Theme injection** — `components/company-theme.tsx` is a server component rendered inside `<head>` in `app/layout.tsx`. It walks the active `ThemeTokens` and emits a `<style>` block: `:root {...}` (light-only / dark-only) or `:root {...} .dark {...}` (system). CSS-var names are derived from token keys (`cardForeground` → `--card-foreground`, `chart1` → `--chart-1`). Adding a new token means editing both `ThemeTokens` in `types.ts` and the matching entry in `@theme inline` in `globals.css`.
- **Mode lock** — `app/layout.tsx` derives `forcedTheme` (passed to `ThemeProvider`) and an initial `class="dark"` on `<html>` (for `dark-only`, so `dark:` utilities apply on first paint). `ThemeHotkey` (in `theme-provider.tsx`) checks `useTheme().forcedTheme` and becomes a no-op when the mode is locked — preserve that guard.
- **Logo & mark** — two components, two roles:
  - `components/company-logo.tsx` (full wordmark) reads `useTheme().resolvedTheme` with a mount guard to avoid hydration mismatches. It picks `logo.dark` in dark mode (falling back to `logo.light`) and accepts a `variant` override for placements where the surface colour doesn't match the theme.
  - `components/company-mark.tsx` (icon-only, used in the brand rail) is driven by the slide's `surface` (`light` | `dark`), not the global theme. When `logo.mark.{light,dark}` exists it picks the surface-appropriate asset; otherwise it falls back to the full logo and applies `logo.lightSurfaceFilter` / `logo.darkSurfaceFilter` (CSS `filter` strings — useful for single-colour SVGs that need recolouring per surface).
  - Both render plain `<img>` against SVG/PNG files in `public/company/<slug>/`. `next/image` is skipped because optimisation doesn't help SVG and breaks when the source changes per-theme/surface.
- **Adding a company:**
  1. `mkdir lib/company/<slug>/` and create `config.ts` + `content.ts` (copy an existing pair as a template).
  2. Drop logos in `public/company/<slug>/`. Pre-colour each SVG — `<img>` can't apply `currentColor` across an SVG boundary, so provide separate `logo-light.svg` / `logo-dark.svg` (and optionally `mark-light.svg` / `mark-dark.svg`) when a dark variant is needed. Alternatively, supply one neutral SVG and recolour via `logo.lightSurfaceFilter` / `logo.darkSurfaceFilter`.
  3. Register the config in `lib/company/active.ts` (add it to the `companies` map).
  4. Run `NEXT_PUBLIC_COMPANY=<slug> npm run dev`.

## Slide deck

`app/page.tsx` renders one component, `<SlideDeck />` from `components/slide-deck/slide-deck.tsx`. The deck is a full-viewport (`h-svh`) one-slide-at-a-time presentation, **not** a scrolling page. The chrome (rail, section label, top-right CTA, dot nav, footer) is fixed; the active slide swaps underneath via `framer-motion` `<AnimatePresence>` with a vertical y-translate variant.

- **Slide registry** lives inline at the top of `slide-deck.tsx` — an array of `{ key, eyebrow, surface, ownsFooter?, Component }`. Optional content sections (`team`, `partners`, `contact` on `CompanyContent`) are conditionally spread into the array; if a company config omits them, those slides just don't exist for that company. The fixed core is `about` → `services` → `featured-works`.
- **Surface (`"light" | "dark"`)** is the single signal every chrome component reads via `useActiveSlide()` to pick contrast colours. When you add a slide, set its `surface` to whatever the slide's actual background looks like — the rail icons, section label, dot nav, and footer all flip on this. (`AboutSlide` and `FeaturedWorksSlide` are intentionally `surface: "dark"` even when the company is in `"light-only"` theme mode, because those slides paint their own dark background images.)
- **`ownsFooter: true`** suppresses `<SlideFooter />` for slides that render their own bottom strip (e.g. `FeaturedWorksSlide` puts the project nav + copyright in a single row).
- **Navigation** is wheel + keyboard (`ArrowDown/Up`, `PageDown/Up`, `Home/End`) + dot nav + brand-rail menu. The wheel handler in `slide-deck.tsx` uses a ref-based `WHEEL_GUARD_MS` debounce (currently 850 ms) — keep it in a ref so re-registering the effect on `activeIndex` change doesn't reset the lock mid-gesture. The keyboard handler skips events whose `target` is editable (`INPUT`, `TEXTAREA`, `SELECT`, `contentEditable`) — preserve that guard.
- **Context** — `components/slide-deck/context.tsx` exposes `useSlideDeck()` (full state) and `useActiveSlide()` (just the current slide's metadata). Anything that needs to flip on surface or know the active index reads from these.
- **Adding a slide:**
  1. Create the slide component under `components/slides/<name>-slide.tsx`. Make it `"use client"` if it uses state/effects (most do). Slides own their own background — typically `bg-neutral-900` for dark surfaces or `bg-background` for light — and pad for the fixed chrome (`md:pl-[120px]` left for the rail, top-right clearance for the primary action).
  2. If the section is optional per-company, add it to `CompanyContent` in `lib/company/types.ts` as an optional field, then in `slide-deck.tsx` spread it conditionally into the slides array (`...(content.foo ? [{ key, ..., Component: FooSlide }] : [])`). If it's mandatory, add the field as required and TypeScript will force every company config to provide it.
  3. Pull copy via `useCompany().content` — never hard-code strings in slide components.

## Content & chrome conventions

- **All copy is data**, not JSX. Every visible string flows from `lib/company/<slug>/content.ts` through `useCompany()`. The `CompanyContent` tree (see `lib/company/types.ts`) defines the schema for `about` / `services` / `featuredWorks` / optional `team` / `partners` / `contact` plus the persistent `primaryAction`, `socials`, `footer`. When you add a piece of UI that needs new copy, add it to the type first, then update every company config.
- **`Surface` typing** is exported from `components/slide-deck/context.tsx` — reuse this type for any new chrome component instead of redefining `"light" | "dark"`.
- **Brand rail (`brand-rail.tsx`)** ships both desktop (vertical, expand-rightward) and mobile (bottom app bar + slide-up overlay) implementations in one component. The desktop rail uses `pointerdown` outside-click + `Escape` to close; the mobile menu locks `body.style.overflow` while open to stop iOS rubber-banding. Both flip colours on the active slide's surface — keep the dual implementations in sync when changing rail behaviour.
- **Fixed-chrome positioning** assumes a 120px-wide left rail on desktop (`md:pl-[120px]`, `md:left-[120px]`). When you add new chrome, follow the existing z-index ladder: chrome `z-40`, rail `z-50`, mobile menu overlay `z-[60]`.
