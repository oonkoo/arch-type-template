import { activeCompany } from "@/lib/company/active"
import type { ThemeTokens } from "@/lib/company/types"

function cssVar(key: string): string {
  const kebab = key
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/([a-z])([0-9])/g, "$1-$2")
    .toLowerCase()
  return `--${kebab}`
}

function renderBlock(selector: string, tokens: ThemeTokens): string {
  const lines = (Object.keys(tokens) as (keyof ThemeTokens)[])
    .map((key) => `  ${cssVar(key)}: ${tokens[key]};`)
    .join("\n")
  return `${selector} {\n${lines}\n}`
}

export function CompanyTheme() {
  const { theme } = activeCompany
  const blocks: string[] = []

  if (theme.mode === "light-only") {
    blocks.push(renderBlock(":root", theme.light))
  } else if (theme.mode === "dark-only") {
    // Tokens live at :root so shadcn utilities work without the .dark class,
    // but app/layout.tsx also sets `class="dark"` on <html> so any `dark:`
    // Tailwind variants continue to apply.
    blocks.push(renderBlock(":root", theme.dark))
  } else {
    blocks.push(renderBlock(":root", theme.light))
    blocks.push(renderBlock(".dark", theme.dark))
  }

  return <style dangerouslySetInnerHTML={{ __html: blocks.join("\n\n") }} />
}
