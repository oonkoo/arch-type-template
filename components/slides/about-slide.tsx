"use client"

import { motion, type Variants } from "framer-motion"

import { SlideBackgroundImage } from "@/components/slide-deck/slide-background-image"
import { useCompany } from "@/hooks/use-company"

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.12,
    },
  },
}

const bodyVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(12px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE_OUT },
  },
}

const ctaVariants: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE_OUT },
  },
}

const headlineVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 80,
    filter: "blur(28px)",
    letterSpacing: "0em",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    letterSpacing: "-0.035em",
    transition: { duration: 1.2, ease: EASE_OUT },
  },
}

export function AboutSlide() {
  const { name, content } = useCompany()
  const { about } = content

  return (
    <motion.div
      className="relative isolate h-full w-full overflow-hidden bg-neutral-900 text-white"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      <SlideBackgroundImage src={about.image.src} alt={about.image.alt} />
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/55" />

      {/* Body text + CTA (mid-left) */}
      <div className="relative z-10 flex h-full w-full flex-col px-6 pt-20 pb-24 md:pt-0 md:pr-12 md:pb-0 md:pl-[120px]">
        <div className="flex flex-1 items-center">
          <div className="max-w-[440px]">
            <motion.p
              variants={bodyVariants}
              className="text-lg leading-snug text-white/85 md:text-xl"
            >
              {about.body}
            </motion.p>
            <motion.div variants={ctaVariants} className="mt-6 md:mt-8">
              <a
                href={about.cta.href}
                className="inline-flex items-center rounded-full border border-white/60 px-7 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-white/10 md:px-6 md:py-2.5 md:text-[13px]"
              >
                {about.cta.label}
              </a>
            </motion.div>
          </div>
        </div>

        {/* Massive display name, bottom-left */}
        <div className="pb-2 md:pb-24">
          <motion.h1
            variants={headlineVariants}
            style={{ willChange: "transform, filter" }}
            className="font-[family-name:var(--font-heading)] text-[clamp(4rem,20vw,14rem)] leading-[0.9] font-extrabold text-white md:text-[clamp(5rem,15vw,14rem)]"
          >
            {name}
          </motion.h1>
        </div>
      </div>
    </motion.div>
  )
}
