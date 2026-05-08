import type { CompanyConfig } from "./types"
import { atelierNord } from "./atelier-nord/config"
import { meridian } from "./meridian/config"
import { sixIxDev } from "./6ix-dev/config"

export const companies = {
  [atelierNord.slug]: atelierNord,
  [meridian.slug]: meridian,
  [sixIxDev.slug]: sixIxDev,
} as const satisfies Record<string, CompanyConfig>

export type CompanySlug = keyof typeof companies

export const DEFAULT_COMPANY: CompanySlug = "atelier-nord"

function resolveSlug(): CompanySlug {
  const raw = process.env.NEXT_PUBLIC_COMPANY
  if (raw && raw in companies) {
    return raw as CompanySlug
  }
  return DEFAULT_COMPANY
}

export const activeCompany: CompanyConfig = companies[resolveSlug()]
