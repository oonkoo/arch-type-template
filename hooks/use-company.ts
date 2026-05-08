import { activeCompany } from "@/lib/company/active"
import type { CompanyConfig } from "@/lib/company/types"

/**
 * Returns the active company config.
 *
 * The value is resolved from `NEXT_PUBLIC_COMPANY` at build time, so this is
 * effectively a static import wrapped in a hook. Works in server components
 * and client components alike — no provider required.
 */
export function useCompany(): CompanyConfig {
  return activeCompany
}
