"use client"

import * as React from "react"
import { RiArrowRightLine } from "@remixicon/react"
import { AnimatePresence, motion, type Variants } from "framer-motion"

import { useSlideDeck } from "@/components/slide-deck/context"
import { useCompany } from "@/hooks/use-company"
import { cn } from "@/lib/utils"

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Counter-translate for the bg layer; same parallax magnitude as
// SlideBackgroundImage so this slide's bg "lags" the slide-deck wrapper
// translate just like the about and contact slides.
const PARALLAX_OFFSET_PCT = 18

const bgWrapperVariants: Variants = {
  enter: (dir: number) => ({
    scale: 1.12,
    y: `${-dir * PARALLAX_OFFSET_PCT}%`,
  }),
  center: {
    scale: 1,
    y: "0%",
    transition: { duration: 1.6, ease: EASE_OUT },
  },
  exit: (dir: number) => ({
    scale: 1.06,
    y: `${dir * PARALLAX_OFFSET_PCT}%`,
    transition: { duration: 0.85, ease: EASE_OUT },
  }),
}

export function FeaturedWorksSlide() {
  const { featuredWorks, footer } = useCompany().content
  const { direction } = useSlideDeck()
  const [activeSlug, setActiveSlug] = React.useState(
    featuredWorks.initialProjectSlug
  )

  const activeIndex = Math.max(
    0,
    featuredWorks.projects.findIndex((p) => p.slug === activeSlug)
  )
  const activeProject = featuredWorks.projects[activeIndex]
  const nextProject =
    featuredWorks.projects[(activeIndex + 1) % featuredWorks.projects.length]

  return (
    <div className="relative isolate h-full w-full overflow-hidden bg-neutral-900 text-white">
      {/* BG: outer parallax-zoom wrapper + inner cross-fade per project. */}
      <motion.div
        custom={direction}
        variants={bgWrapperVariants}
        initial="enter"
        animate="center"
        exit="exit"
        style={{ willChange: "transform" }}
        className="pointer-events-none absolute inset-0"
      >
        <AnimatePresence>
          {/* eslint-disable-next-line @next/next/no-img-element -- intentionally full-bleed; next/image adds layout overhead we don't need here */}
          <motion.img
            key={activeProject.slug}
            src={activeProject.image.src}
            alt={activeProject.image.alt}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
      </motion.div>
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/65" />

      {/* Description + View Project (mid-left) */}
      <div className="relative z-10 flex h-full flex-col px-6 pt-20 pb-52 md:pt-0 md:pr-12 md:pb-0 md:pl-[120px]">
        <div className="flex flex-1 items-center">
          <div className="max-w-[420px]">
            <AnimatePresence mode="popLayout">
              <motion.p
                key={activeProject.slug}
                initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
                transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.2 }}
                className="text-base leading-snug text-white/85 md:text-[17px]"
              >
                {activeProject.description}
              </motion.p>
            </AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.65, ease: EASE_OUT, delay: 0.3 }}
              className="mt-6"
            >
              <a
                href={`#projects/${activeProject.slug}`}
                className="inline-flex items-center rounded-full border border-white/60 px-5 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-white/10 md:px-6 md:py-2.5 md:text-[13px]"
              >
                {featuredWorks.projectCtaLabel}
              </a>
            </motion.div>
          </div>
        </div>

        {/* Massive display name, bottom-left */}
        <div className="pb-2 md:pb-[120px]">
          <AnimatePresence mode="popLayout">
            <motion.h1
              key={activeProject.slug}
              initial={{
                opacity: 0,
                y: 80,
                filter: "blur(28px)",
                letterSpacing: "0em",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                letterSpacing: "-0.035em",
              }}
              exit={{
                opacity: 0,
                y: -40,
                filter: "blur(28px)",
              }}
              transition={{ duration: 1.0, ease: EASE_OUT, delay: 0.2 }}
              style={{ willChange: "transform, filter" }}
              className="font-[family-name:var(--font-heading)] text-[clamp(3rem,11vw,14rem)] leading-[0.9] font-extrabold text-white md:text-[clamp(5rem,15vw,14rem)]"
            >
              {activeProject.title}
            </motion.h1>
          </AnimatePresence>
        </div>
      </div>

      {/* Large next-project button */}
      <motion.button
        type="button"
        onClick={() => setActiveSlug(nextProject.slug)}
        aria-label={`Next project: ${nextProject.title}`}
        initial={{ opacity: 0, scale: 0, rotate: -45 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 320,
          damping: 22,
          delay: 0.5,
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ willChange: "transform" }}
        className="group absolute right-4 bottom-36 z-20 grid size-24 place-items-center rounded-full border border-white/35 text-white transition-colors hover:border-white hover:bg-white/10 md:right-10 md:bottom-28 md:size-28"
      >
        <RiArrowRightLine
          size={28}
          aria-hidden
          className="transition-transform duration-300 group-hover:translate-x-1.5 md:hidden"
        />
        <RiArrowRightLine
          size={36}
          aria-hidden
          className="hidden transition-transform duration-300 group-hover:translate-x-1.5 md:block"
        />
        <span className="absolute -bottom-5 right-0 text-[9px] tracking-[0.2em] text-white/65 uppercase md:-bottom-7 md:text-[10px]">
          Next
        </span>
      </motion.button>

      {/* Bottom strip: project nav + All Projects + copyright */}
      <div className="pointer-events-none absolute inset-x-0 bottom-20 z-20 flex flex-col items-start gap-3 px-6 tracking-wide text-white/75 md:flex-row md:items-center md:justify-between md:gap-8 md:bottom-6 md:pr-10 md:pl-[120px] md:text-[12px]">
        <div className="pointer-events-auto flex flex-col items-start gap-2 text-[15px] md:flex-row md:items-center md:gap-10 md:text-[12px]">
          {featuredWorks.projects.map((project, i) => {
            const isActive = project.slug === activeProject.slug
            return (
              <motion.button
                key={project.slug}
                type="button"
                onClick={() => setActiveSlug(project.slug)}
                initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.55,
                  ease: EASE_OUT,
                  delay: 0.6 + i * 0.05,
                }}
                className={cn(
                  "whitespace-nowrap transition-colors",
                  isActive ? "font-medium text-white" : "hover:text-white/90"
                )}
              >
                {project.shortTitle}
              </motion.button>
            )
          })}
        </div>
        <div className="pointer-events-auto flex shrink-0 items-center gap-6 md:gap-10">
          <motion.a
            href={featuredWorks.allProjectsHref}
            initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.55,
              ease: EASE_OUT,
              delay: 0.6 + featuredWorks.projects.length * 0.05,
            }}
            className="whitespace-nowrap text-[13px] text-white underline decoration-white/70 underline-offset-4 md:text-[12px]"
          >
            {featuredWorks.allProjectsLabel}
          </motion.a>
          <motion.span
            initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.55,
              ease: EASE_OUT,
              delay: 0.65 + featuredWorks.projects.length * 0.05,
            }}
            className="hidden whitespace-nowrap md:inline"
          >
            {footer.copyright}
          </motion.span>
        </div>
      </div>
    </div>
  )
}
