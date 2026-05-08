"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"

import { BrandRail } from "@/components/slide-deck/brand-rail"
import {
  SlideDeckProvider,
  type SlideMeta,
} from "@/components/slide-deck/context"
import { DotNav } from "@/components/slide-deck/dot-nav"
import { PrimaryActions } from "@/components/slide-deck/primary-actions"
import { SectionLabel } from "@/components/slide-deck/section-label"
import { SlideFooter } from "@/components/slide-deck/slide-footer"
import { AboutSlide } from "@/components/slides/about-slide"
import { ContactSlide } from "@/components/slides/contact-slide"
import { FeaturedWorksSlide } from "@/components/slides/featured-works-slide"
import { PartnersSlide } from "@/components/slides/partners-slide"
import { ServicesSlide } from "@/components/slides/services-slide"
import { TeamSlide } from "@/components/slides/team-slide"
import { useCompany } from "@/hooks/use-company"

/** Debounce window between wheel-driven slide changes. */
const WHEEL_GUARD_MS = 850

export function SlideDeck() {
  const { content } = useCompany()

  const slides = React.useMemo<
    (SlideMeta & { Component: React.ComponentType })[]
  >(
    () => [
      {
        key: "about",
        eyebrow: content.about.eyebrow,
        surface: "dark",
        Component: AboutSlide,
      },
      {
        key: "services",
        eyebrow: content.services.sectionTitle,
        surface: "light",
        Component: ServicesSlide,
      },
      {
        key: "featured-works",
        eyebrow: content.featuredWorks.sectionTitle,
        surface: "dark",
        ownsFooter: true,
        Component: FeaturedWorksSlide,
      },
      ...(content.team
        ? [
            {
              key: "team",
              eyebrow: content.team.sectionTitle,
              surface: "dark" as const,
              Component: TeamSlide,
            },
          ]
        : []),
      ...(content.partners
        ? [
            {
              key: "partners",
              eyebrow: content.partners.sectionTitle,
              surface: "light" as const,
              Component: PartnersSlide,
            },
          ]
        : []),
      ...(content.contact
        ? [
            {
              key: "contact",
              eyebrow: content.contact.sectionTitle,
              surface: "dark" as const,
              Component: ContactSlide,
            },
          ]
        : []),
    ],
    [content]
  )

  const [activeIndex, setActiveIndex] = React.useState(0)
  // +1 = entering from bottom (forward), -1 = entering from top (backward)
  const [direction, setDirection] = React.useState<1 | -1>(1)

  const goTo = React.useCallback(
    (next: number) => {
      if (next < 0 || next >= slides.length) return
      setActiveIndex((current) => {
        if (next === current) return current
        setDirection(next > current ? 1 : -1)
        return next
      })
    },
    [slides.length]
  )

  const next = React.useCallback(
    () => goTo(activeIndex + 1),
    [goTo, activeIndex]
  )
  const prev = React.useCallback(
    () => goTo(activeIndex - 1),
    [goTo, activeIndex]
  )

  // Debounce lock — kept in a ref so re-registering the effect (which happens
  // whenever `activeIndex` changes) doesn't reset the window mid-gesture.
  const wheelLockUntilRef = React.useRef(0)

  // Wheel + keyboard nav.
  React.useEffect(() => {
    function onWheel(event: WheelEvent) {
      if (Math.abs(event.deltaY) < 8) return
      const now = performance.now()
      if (now < wheelLockUntilRef.current) return
      wheelLockUntilRef.current = now + WHEEL_GUARD_MS
      if (event.deltaY > 0) next()
      else prev()
    }

    function onKey(event: KeyboardEvent) {
      const target = event.target
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT")
      ) {
        return
      }
      if (event.key === "ArrowDown" || event.key === "PageDown") {
        event.preventDefault()
        next()
      } else if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault()
        prev()
      } else if (event.key === "Home") {
        event.preventDefault()
        goTo(0)
      } else if (event.key === "End") {
        event.preventDefault()
        goTo(slides.length - 1)
      }
    }

    window.addEventListener("wheel", onWheel, { passive: true })
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("keydown", onKey)
    }
  }, [next, prev, goTo, slides.length])

  const slideMetas = React.useMemo<SlideMeta[]>(
    () =>
      slides.map(({ key, eyebrow, surface, ownsFooter }) => ({
        key,
        eyebrow,
        surface,
        ownsFooter,
      })),
    [slides]
  )

  const contextValue = React.useMemo(
    () => ({
      slides: slideMetas,
      activeIndex,
      direction,
      goTo,
      next,
      prev,
    }),
    [slideMetas, activeIndex, direction, goTo, next, prev]
  )

  const ActiveComponent = slides[activeIndex].Component

  return (
    <SlideDeckProvider value={contextValue}>
      <div className="relative h-svh w-full overflow-hidden bg-background text-foreground">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={slides[activeIndex].key}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={SLIDE_TRANSITION}
            className="absolute inset-0"
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>

        <BrandRail />
        <SectionLabel />
        <PrimaryActions />
        <DotNav />
        <SlideFooter />
      </div>
    </SlideDeckProvider>
  )
}

const slideVariants = {
  enter: (dir: number) => ({ y: dir > 0 ? "100%" : "-100%" }),
  center: { y: "0%" },
  exit: (dir: number) => ({ y: dir > 0 ? "-100%" : "100%" }),
}

const SLIDE_TRANSITION = {
  duration: 0.75,
  ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
}
