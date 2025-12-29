import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react"
import { type RefObject, useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

type Step = {
  id: string
  kicker: string
  title: string
  body: string
  media: {
    title: string
  }
}

type StickySideScrollytellingProps = {
  steps?: Step[]
  mediaSide?: "left" | "right"
  scrollContainerRef?: RefObject<HTMLElement | null>
}

const DEFAULT_STEPS: Step[] = [
  {
    id: "01",
    kicker: "Step 01",
    title: "Signal Discovery",
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed urna in nisi posuere consequat. Ut blandit neque vitae justo vulputate. Integer varius sapien vitae odio fringilla, sed commodo erat interdum. Mauris accumsan velit ut nibh cursus, ac aliquam lacus pulvinar. Curabitur gravida nunc at ligula fermentum, a aliquet justo malesuada.",
    media: {
      title: "Placeholder Media A",
    },
  },
  {
    id: "02",
    kicker: "Step 02",
    title: "Pattern Alignment",
    body:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Eu tincidunt tortor aliquam nulla facilisi cras fermentum odio. Egestas maecenas pharetra convallis posuere morbi leo urna molestie at. Quisque vel lacus faucibus, posuere libero in, congue lectus. Maecenas sed cursus nunc, vitae pellentesque est.",
    media: {
      title: "Placeholder Media B",
    },
  },
  {
    id: "03",
    kicker: "Step 03",
    title: "Prototype Drift",
    body:
      "Quis ipsum suspendisse ultrices gravida. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Semper feugiat nibh sed pulvinar proin gravida hendrerit lectus. Ultricies mi eget mauris pharetra et ultrices neque ornare aenean. Integer at neque non quam cursus faucibus in in quam. Duis volutpat velit sit amet mi efficitur, nec commodo nunc sodales.",
    media: {
      title: "Placeholder Media C",
    },
  },
  {
    id: "04",
    kicker: "Step 04",
    title: "Scale Rehearsal",
    body:
      "Nisl nunc mi ipsum faucibus vitae aliquet nec. Amet facilisis magna etiam tempor orci eu lobortis elementum. Consequat mauris nunc congue nisi vitae suscipit tellus mauris a. Enim eu turpis egestas pretium aenean pharetra magna ac. Nulla facilisi morbi tempus iaculis urna id volutpat. Fusce aliquet sem vel orci hendrerit, non mattis lectus tempor.",
    media: {
      title: "Placeholder Media D",
    },
  },
  {
    id: "05",
    kicker: "Step 05",
    title: "Launch Narrative",
    body:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Magna etiam tempor orci eu. Aliquam vestibulum morbi blandit cursus risus at ultrices mi tempus. Risus ultricies tristique nulla aliquet enim tortor at auctor. Cras fermentum odio eu feugiat pretium nibh ipsum consequat. Sed sed viverra ipsum nunc aliquet bibendum enim facilisis.",
    media: {
      title: "Placeholder Media E",
    },
  },
]

export default function StickySideScrollytelling({
  steps = DEFAULT_STEPS,
  mediaSide = "right",
  scrollContainerRef,
}: StickySideScrollytellingProps) {
  const mediaFrameRef = useRef<HTMLDivElement | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [stickyTop, setStickyTop] = useState<number | null>(null)
  const isMediaLeft = mediaSide === "left"

  useEffect(() => {
    if (typeof window === "undefined") return
    const element = mediaFrameRef.current
    if (!element) return

    const updateStickyTop = () => {
      const rect = element.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const nextTop = Math.max((viewportHeight - rect.height) / 2, 0)
      setStickyTop(nextTop)
    }

    updateStickyTop()

    const resizeObserver = "ResizeObserver" in window ? new ResizeObserver(updateStickyTop) : null
    resizeObserver?.observe(element)
    window.addEventListener("resize", updateStickyTop)

    return () => {
      resizeObserver?.disconnect()
      window.removeEventListener("resize", updateStickyTop)
    }
  }, [])

  if (!steps.length) return null

  return (
    <section className="bg-background text-foreground">
      <div
        className={cn(
          "mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16 lg:flex-row",
          isMediaLeft && "lg:flex-row-reverse"
        )}
      >
        <div className="flex-1 space-y-6">
          {steps.map((step, index) => (
            <StepCard
              key={step.id}
              kicker={step.kicker}
              title={step.title}
              body={step.body}
              isActive={index === activeIndex}
              scrollContainerRef={scrollContainerRef}
              onActive={() => setActiveIndex(index)}
            />
          ))}
        </div>

        <div className="flex-1">
          <div
            className="lg:sticky"
            style={{
              top: stickyTop ?? 0,
              visibility: stickyTop === null ? "hidden" : "visible",
            }}
          >
            <div
              ref={mediaFrameRef}
              className="relative aspect-4/5 min-h-90"
            >
              {steps.map((step, index) => {
                const isActive = index === activeIndex
                const inactiveOffset = index < activeIndex ? -24 : 24
                return (
                  <motion.div
                    key={step.id}
                    className="absolute inset-0 border"
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      y: isActive ? 0 : inactiveOffset,
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    style={{ pointerEvents: isActive ? "auto" : "none" }}
                    aria-hidden={!isActive}
                  >
                    <div className="flex h-full items-center justify-center bg-muted">
                      <span className="text-3xl font-semibold text-foreground">
                        {step.media.title}
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

type StepCardProps = {
  kicker: string
  title: string
  body: string
  isActive: boolean
  scrollContainerRef?: RefObject<HTMLElement | null>
  onActive: () => void
}

function StepCard({ kicker, title, body, isActive, scrollContainerRef, onActive }: StepCardProps) {
  const cardRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll(
    scrollContainerRef
      ? {
          target: cardRef,
          container: scrollContainerRef,
          offset: ["start end", "end start"],
        }
      : {
          target: cardRef,
          offset: ["start end", "end start"],
        }
  )
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.2,
  })
  const opacity = useTransform(smoothProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0])

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextActive = latest > 0.35
    if (nextActive) {
      onActive()
    }
  })

  return (
    <motion.article
      ref={cardRef}
      style={{ opacity }}
      className="flex min-h-[60vh] items-center"
      aria-current={isActive ? "step" : undefined}
    >
      <div
        className="w-full border border-border p-4 transition-colors"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          {kicker}
        </p>
        <h3 className="mt-2 text-2xl font-semibold text-foreground">{title}</h3>
        <p className="mt-2 text-base text-muted-foreground">{body}</p>
      </div>
    </motion.article>
  )
}
