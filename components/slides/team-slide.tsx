"use client"

import { RiArrowRightUpLine } from "@remixicon/react"
import { motion } from "framer-motion"

import { useCompany } from "@/hooks/use-company"
import type { TeamMember } from "@/lib/company/types"
import { cn } from "@/lib/utils"

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Delay slots for the radiating cascade, ordered by visual distance from the
// featured circle. The featured circle plays first — like a center stone
// dropped — and the others ripple out in concentric rings.
const D_FEATURED = 0.15
const D_RING_INNER = 0.32 // col4 (adjacent to featured)
const D_RING_INNER_B = 0.36
const D_RING_MID = 0.44 // col1 + col5
const D_RING_MID_B = 0.48
const D_RING_OUTER = 0.56 // col6
const D_RING_OUTER_B = 0.6

// Mobile DOM-order delays — the zigzag layout reads top-to-bottom so the
// cascade follows that, with featured still leading.
const D_M_ROW1A = 0.32
const D_M_ROW1B = 0.36
const D_M_ROW3A = 0.44
const D_M_ROW3B = 0.48
const D_M_ROW4 = 0.56
const D_M_ROW5A = 0.62
const D_M_ROW5B = 0.66
const D_M_ROW6 = 0.74

const D_DESCRIPTION = 0.85
const D_CTA = 0.95

const FEATURED_SPRING = {
  type: "spring" as const,
  stiffness: 180,
  damping: 18,
  delay: D_FEATURED,
}

export function TeamSlide() {
  const { team } = useCompany().content
  // Guard: the SlideDeck only mounts this slide when team is defined, but keep
  // the runtime check so the component is safe to render in isolation.
  if (!team) return null

  const small = team.members

  return (
    <div className="relative h-full w-full overflow-hidden bg-neutral-900 text-white">
      <div className="flex h-full flex-col justify-center px-6 pt-20 pb-24 md:px-[120px] md:pt-28 md:pb-28">
        <div className="mx-auto w-full max-w-[1100px]">
          {/* Mobile: zigzag 2-1-2-1-2-1 — alternating pair rows and centered single rows.
              Width is bounded by both axes so the grid + CTA always fit inside one viewport
              without scrolling. Six rows means height ≈ 3 × width + gaps, hence the /3 in the
              vertical clamp; the 280px allowance covers pt-20 + pb-24 + CTA + breathing room. */}
          <div className="md:hidden">
            <div className="mx-auto grid w-[min(calc(44vw+8px),calc((100svh-280px)/3))] max-w-[240px] grid-cols-2 gap-2">
              {/* Row 1 — pair */}
              <MemberCircle member={small[0]} delay={D_M_ROW1A} />
              <MemberCircle member={small[1]} delay={D_M_ROW1B} />

              {/* Row 2 — featured, centered + slightly larger */}
              <div className="col-span-2 flex justify-center">
                <div className="w-[60%]">
                  <FeaturedCircle member={team.featured} />
                </div>
              </div>

              {/* Row 3 — pair */}
              <MemberCircle member={small[2]} delay={D_M_ROW3A} />
              <MemberCircle member={small[3]} delay={D_M_ROW3B} />

              {/* Row 4 — centered single */}
              <div className="col-span-2 flex justify-center">
                <div className="w-[calc(50%-0.25rem)]">
                  <MemberCircle member={small[4]} delay={D_M_ROW4} />
                </div>
              </div>

              {/* Row 5 — pair */}
              <MemberCircle member={small[5]} delay={D_M_ROW5A} />
              <MemberCircle member={small[6]} delay={D_M_ROW5B} />

              {/* Row 6 — see-all, centered */}
              <div className="col-span-2 flex justify-center">
                <div className="w-[calc(50%-0.25rem)]">
                  <SeeAllCircle seeAll={team.seeAll} delay={D_M_ROW6} />
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.65, ease: EASE_OUT, delay: D_CTA }}
              className="mt-5 flex justify-center"
            >
              <a
                href={team.cta.href}
                className="inline-flex items-center rounded-full border border-white/60 px-5 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-white/10"
              >
                {team.cta.label}
              </a>
            </motion.div>
          </div>

          {/* Desktop: 6×2 grid with featured spanning 2×2 in the middle. */}
          <div className="hidden aspect-[3/1] grid-cols-6 grid-rows-2 gap-4 md:grid">
            <MemberCircle
              member={small[0]}
              delay={D_RING_MID}
              className="col-start-1 row-start-1"
            />
            <MemberCircle
              member={small[1]}
              delay={D_RING_MID_B}
              className="col-start-1 row-start-2"
            />
            <FeaturedCircle
              member={team.featured}
              className="col-start-2 col-span-2 row-span-2"
            />
            <MemberCircle
              member={small[2]}
              delay={D_RING_INNER}
              className="col-start-4 row-start-1"
            />
            <MemberCircle
              member={small[3]}
              delay={D_RING_INNER_B}
              className="col-start-4 row-start-2"
            />
            <MemberCircle
              member={small[4]}
              delay={D_RING_MID}
              className="col-start-5 row-start-1"
            />
            <SeeAllCircle
              seeAll={team.seeAll}
              delay={D_RING_MID_B}
              className="col-start-5 row-start-2"
            />
            <MemberCircle
              member={small[5]}
              delay={D_RING_OUTER}
              className="col-start-6 row-start-1"
            />
            <MemberCircle
              member={small[6]}
              delay={D_RING_OUTER_B}
              className="col-start-6 row-start-2"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.75, ease: EASE_OUT, delay: D_DESCRIPTION }}
            className="mt-12 hidden md:block"
          >
            <p className="max-w-[520px] text-[15px] leading-relaxed text-white/80">
              {team.description}
            </p>
            <div className="mt-6">
              <a
                href={team.cta.href}
                className="inline-flex items-center rounded-full border border-white/60 px-6 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-white/10"
              >
                {team.cta.label}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function MemberCircle({
  member,
  className,
  delay,
}: {
  member: TeamMember | undefined
  className?: string
  delay: number
}) {
  if (!member) return <div className={className} aria-hidden />

  const display = member.shortName ?? member.name

  return (
    <motion.div
      title={member.role ? `${member.name} — ${member.role}` : member.name}
      initial={{ opacity: 0, scale: 0.4, filter: "blur(12px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ type: "spring", stiffness: 280, damping: 22, delay }}
      style={{ willChange: "transform, filter" }}
      className={cn(
        "relative aspect-square overflow-hidden rounded-full bg-neutral-800",
        className
      )}
    >
      {member.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={member.image.src}
          alt={member.image.alt}
          className="h-full w-full object-cover grayscale"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center px-3 text-center text-[13px] leading-tight text-white/90">
          {display}
        </div>
      )}
    </motion.div>
  )
}

function FeaturedCircle({
  member,
  className,
}: {
  member: TeamMember
  className?: string
}) {
  const display = member.shortName ?? member.name

  return (
    <motion.div
      title={member.role ? `${member.name} — ${member.role}` : member.name}
      initial={{ opacity: 0, scale: 0.3, filter: "blur(20px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={FEATURED_SPRING}
      style={{ willChange: "transform, filter" }}
      className={cn(
        "relative aspect-square overflow-hidden rounded-full bg-neutral-800",
        className
      )}
    >
      {member.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={member.image.src}
          alt={member.image.alt}
          className="h-full w-full object-cover grayscale"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center px-6 text-center text-xl leading-tight text-white/95">
          {display}
        </div>
      )}
    </motion.div>
  )
}

function SeeAllCircle({
  seeAll,
  className,
  delay,
}: {
  seeAll: { label: string; href: string }
  className?: string
  delay: number
}) {
  return (
    <motion.a
      href={seeAll.href}
      target={seeAll.href.startsWith("http") ? "_blank" : undefined}
      rel={seeAll.href.startsWith("http") ? "noreferrer" : undefined}
      initial={{ opacity: 0, scale: 0.4, filter: "blur(12px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ type: "spring", stiffness: 280, damping: 22, delay }}
      style={{ willChange: "transform, filter" }}
      className={cn(
        "group relative grid aspect-square place-items-center rounded-full border border-white/25 text-center text-white/85 transition-colors hover:border-white/60 hover:text-white",
        className
      )}
    >
      <div>
        <div className="px-3 text-[13px] leading-tight whitespace-pre-line">
          {seeAll.label}
        </div>
        <RiArrowRightUpLine
          className="mx-auto mt-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          size={16}
          aria-hidden
        />
      </div>
    </motion.a>
  )
}
