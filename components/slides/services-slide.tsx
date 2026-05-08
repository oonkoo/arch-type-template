"use client"

import {
  RiCompass3Line,
  RiDraftLine,
  RiHome2Line,
  RiNodeTree,
  RiSofaLine,
  type RemixiconComponentType,
} from "@remixicon/react"
import { motion, type Variants } from "framer-motion"

import { useCompany } from "@/hooks/use-company"
import type {
  ServiceCategory,
  ServiceIcon,
  ServicePill,
} from "@/lib/company/types"
import { cn } from "@/lib/utils"

const ICON: Record<ServiceIcon, RemixiconComponentType> = {
  architecture: RiNodeTree,
  furniture: RiSofaLine,
  planning: RiCompass3Line,
  interior: RiHome2Line,
  render: RiDraftLine,
}

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

const rootVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.18,
    },
  },
}

const gridVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.18,
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.97, filter: "blur(14px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.95,
      ease: EASE_OUT,
      delayChildren: 0.1,
      staggerChildren: 0.07,
    },
  },
}

const eyebrowVariants: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_OUT },
  },
}

const iconVariants: Variants = {
  hidden: { opacity: 0, scale: 0, rotate: -45 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 380, damping: 20 },
  },
}

const pillsRowVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.05,
      staggerChildren: 0.05,
    },
  },
}

const pillVariants: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(8px)", scale: 0.92 },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: { duration: 0.65, ease: EASE_OUT },
  },
}

const descriptionVariants: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    // Sit through most of the card cascade before sliding in.
    transition: { duration: 0.85, ease: EASE_OUT, delay: 0.7 },
  },
}

export function ServicesSlide() {
  const { services } = useCompany().content

  return (
    <motion.div
      className="relative h-full w-full overflow-hidden bg-background text-foreground"
      initial="hidden"
      animate="show"
      variants={rootVariants}
    >
      <div className="flex h-full flex-col justify-start px-6 pt-20 pb-24 md:justify-center md:px-[120px] md:pt-24 md:pb-28">
        <motion.div
          variants={gridVariants}
          className="grid gap-4 md:gap-5 lg:grid-cols-2"
        >
          {services.categories.map((category) => (
            <CategoryCard key={category.eyebrow} category={category} />
          ))}
        </motion.div>
        <motion.p
          variants={descriptionVariants}
          className="mt-10 max-w-[560px] text-[14px] leading-relaxed text-muted-foreground md:mt-14 md:text-[15px]"
        >
          {services.sectionDescription}
        </motion.p>
      </div>
    </motion.div>
  )
}

function CategoryCard({ category }: { category: ServiceCategory }) {
  const Icon = ICON[category.icon]

  return (
    <motion.div
      variants={cardVariants}
      style={{ willChange: "transform, filter" }}
      className="rounded-[20px] bg-card p-6 md:p-10"
    >
      <div className="flex items-start justify-between gap-4">
        <motion.div
          variants={eyebrowVariants}
          className={cn(
            "max-w-[190px] text-[12px] leading-tight font-semibold tracking-[0.06em] uppercase underline decoration-foreground/80 underline-offset-2",
            "font-[family-name:var(--font-heading)]"
          )}
        >
          {category.eyebrow}
        </motion.div>
        <motion.div
          variants={iconVariants}
          style={{ willChange: "transform" }}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-foreground md:h-10 md:w-10"
        >
          <Icon size={16} aria-hidden className="md:hidden" />
          <Icon size={18} aria-hidden className="hidden md:block" />
        </motion.div>
      </div>

      <motion.div
        variants={pillsRowVariants}
        className="mt-10 flex flex-wrap items-center gap-x-2.5 gap-y-2.5 text-[18px] leading-none md:mt-16 md:gap-x-3 md:gap-y-3 md:text-[22px]"
      >
        {category.pills.map((pill, i) => (
          <Pill key={`${pill.label}-${i}`} pill={pill} />
        ))}
      </motion.div>
    </motion.div>
  )
}

function Pill({ pill }: { pill: ServicePill }) {
  if (pill.emphasis === "plain") {
    return (
      <motion.span variants={pillVariants} className="whitespace-nowrap">
        {pill.label}
      </motion.span>
    )
  }

  const base =
    "inline-flex items-center whitespace-nowrap rounded-full px-4 py-2 md:px-5 md:py-2.5"
  const tone =
    pill.emphasis === "solid"
      ? "bg-foreground text-background"
      : pill.emphasis === "accent"
        ? "bg-primary text-primary-foreground"
        : "border border-foreground text-foreground"

  return (
    <motion.span variants={pillVariants} className={cn(base, tone)}>
      {pill.label}
    </motion.span>
  )
}
