"use client"

import { motion, type Variants } from "framer-motion"

import { useSlideDeck } from "@/components/slide-deck/context"
import { cn } from "@/lib/utils"

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Counter-translate (in %) applied while the slide-deck wrapper translates
// 100%. Smaller than 100% means the bg "lags" behind the content — parallax.
const PARALLAX_OFFSET_PCT = 18

const variants: Variants = {
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

type Props = {
  src: string
  alt: string
  className?: string
}

export function SlideBackgroundImage({ src, alt, className }: Props) {
  const { direction } = useSlideDeck()

  return (
    // eslint-disable-next-line @next/next/no-img-element -- intentionally full-bleed; next/image adds layout overhead we don't need here
    <motion.img
      src={src}
      alt={alt}
      aria-hidden={alt === "" || undefined}
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      style={{ willChange: "transform" }}
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full object-cover",
        className
      )}
    />
  )
}
