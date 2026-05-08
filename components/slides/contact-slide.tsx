"use client"

import * as React from "react"
import { motion } from "framer-motion"

import { SlideBackgroundImage } from "@/components/slide-deck/slide-background-image"
import { useCompany } from "@/hooks/use-company"
import type { ContactDetail } from "@/lib/company/types"
import { cn } from "@/lib/utils"

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

const HEADING_BASE_DELAY = 0.15
const HEADING_WORD_STEP = 0.05
const HEADING_DURATION = 0.85

const DETAIL_BASE_DELAY = 0.85
const DETAIL_BLOCK_STEP = 0.08

const CTA_DELAY = 1.4

export function ContactSlide() {
  const { contact } = useCompany().content
  // Guard: the SlideDeck only mounts this slide when contact is defined, but
  // keep the runtime check so the component is safe to render in isolation.
  if (!contact) return null

  const words = contact.heading.split(" ")

  return (
    <div className="relative h-full w-full overflow-hidden bg-neutral-900 text-white">
      {contact.backgroundImage && (
        <>
          <SlideBackgroundImage
            src={contact.backgroundImage.src}
            alt={contact.backgroundImage.alt}
            className="opacity-15"
          />
          {/* Subtle bottom vignette so the contact details stay legible against the photo. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-900/60"
          />
        </>
      )}
      <div className="relative z-10 flex h-full flex-col justify-start px-6 pt-20 pb-24 md:justify-center md:px-[120px] md:pt-28 md:pb-28">
        <div className="mx-auto flex h-full w-full max-w-[1100px] flex-col md:block md:h-auto">
          <h1 className="max-w-[900px] font-[family-name:var(--font-heading)] text-[clamp(3rem,6vw,5.5rem)] leading-[1.05] font-extrabold tracking-[-0.025em] text-white">
            {words.map((word, i) => (
              <React.Fragment key={`${word}-${i}`}>
                <motion.span
                  initial={{ opacity: 0, y: 40, filter: "blur(16px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: HEADING_DURATION,
                    ease: EASE_OUT,
                    delay: HEADING_BASE_DELAY + i * HEADING_WORD_STEP,
                  }}
                  style={{ willChange: "transform, filter" }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
                {i < words.length - 1 && " "}
              </React.Fragment>
            ))}
          </h1>

          <div className="mt-auto flex flex-col items-start gap-7 pt-10 md:mt-16 md:flex-row md:items-end md:justify-between md:gap-12 md:pt-0">
            <div className="grid w-full grid-cols-1 gap-7 md:max-w-[760px] md:flex-1 md:grid-cols-3 md:gap-12">
              {contact.details.map((detail, i) => (
                <DetailBlock
                  key={detail.label}
                  detail={detail}
                  delay={DETAIL_BASE_DELAY + i * DETAIL_BLOCK_STEP}
                />
              ))}
            </div>
            {contact.cta && (
              <motion.a
                href={contact.cta.href}
                initial={{ opacity: 0, scale: 0.85, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 22,
                  delay: CTA_DELAY,
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{ willChange: "transform, filter" }}
                className="inline-flex shrink-0 items-center rounded-full border border-white/60 px-7 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-white/10 md:px-6 md:py-2.5 md:text-[13px]"
              >
                {contact.cta.label}
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function DetailBlock({
  detail,
  delay,
}: {
  detail: ContactDetail
  delay: number
}) {
  const isExternal = detail.href?.startsWith("http")

  const labelEl = (
    <motion.div
      initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.55, ease: EASE_OUT, delay }}
      className="text-[12px] tracking-[0.25em] text-white/55 uppercase md:text-[10px]"
    >
      {detail.label}
    </motion.div>
  )

  const valueEl = (
    <motion.div
      initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.65, ease: EASE_OUT, delay: delay + 0.08 }}
      className="mt-3 text-[18px] leading-relaxed whitespace-pre-line text-white/90 md:text-[15px]"
    >
      {detail.value}
    </motion.div>
  )

  if (detail.href) {
    return (
      <a
        href={detail.href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        className={cn(
          "group block transition-colors hover:[&>div:last-child]:text-white"
        )}
      >
        {labelEl}
        {valueEl}
      </a>
    )
  }

  return (
    <div>
      {labelEl}
      {valueEl}
    </div>
  )
}
