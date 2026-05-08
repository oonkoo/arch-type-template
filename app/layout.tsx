import type { Metadata } from "next"
import { Geist_Mono, Public_Sans, Manrope } from "next/font/google"

import "./globals.css"
import { CompanyTheme } from "@/components/company-theme"
import { ThemeProvider } from "@/components/theme-provider"
import { activeCompany } from "@/lib/company/active"
import { cn } from "@/lib/utils"

const manropeHeading = Manrope({ subsets: ["latin"], variable: "--font-heading" })
const publicSans = Public_Sans({ subsets: ["latin"], variable: "--font-sans" })
const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: activeCompany.name,
  description: activeCompany.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { mode } = activeCompany.theme
  const forcedTheme =
    mode === "light-only" ? "light" : mode === "dark-only" ? "dark" : undefined

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        // Ensure `dark:` utilities apply from the first paint in dark-only mode.
        mode === "dark-only" && "dark",
        fontMono.variable,
        "font-sans",
        publicSans.variable,
        manropeHeading.variable
      )}
    >
      <head>
        <CompanyTheme />
      </head>
      <body>
        <ThemeProvider forcedTheme={forcedTheme}>{children}</ThemeProvider>
      </body>
    </html>
  )
}
