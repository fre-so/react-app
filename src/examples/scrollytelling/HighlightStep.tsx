import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react"
import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

type Step = {
  id: string
  title: string
  description: string
  media: {
    title: string
    description: string
  }
}

type HighlightStepScrollytellingProps = {
  steps?: Step[]
  mediaSide?: "left" | "right"
}

const STEP_SCROLL_DISTANCE = 400

const DEFAULT_STEPS: Step[] = [
  {
    id: "01",
    title: "Define the question",
    description:
      "Anchor the narrative around the decision you want the reader to make. Keep the scope tight and explicit.",
    media: {
      title: "Problem frame",
      description: "A stable canvas that surfaces the stakes.",
    },
  },
  {
    id: "02",
    title: "Surface the tension",
    description:
      "Highlight what breaks today and why it matters. One or two sentences is enough to create momentum.",
    media: {
      title: "Current state",
      description: "Visualize the friction without changing the layout.",
    },
  },
  {
    id: "03",
    title: "Contrast the options",
    description:
      "Compare two approaches side by side, calling out the trade-offs in a single concise line.",
    media: {
      title: "Option split",
      description: "Swap the media while the frame stays fixed.",
    },
  },
  {
    id: "04",
    title: "Commit to the shift",
    description:
      "Close with the next step and the impact. Make the transition feel deliberate, not abrupt.",
    media: {
      title: "Decision moment",
      description: "Reinforce the narrative with a stable focal point.",
    },
  },
]

export default function HighlightStepScrollytelling({
  steps = DEFAULT_STEPS,
  mediaSide = "right",
}: HighlightStepScrollytellingProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const stickyContentRef = useRef<HTMLDivElement | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [stickyTop, setStickyTop] = useState<number | null>(null)
  const isMediaLeft = mediaSide === "left"

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.2,
  })

  useEffect(() => {
    if (typeof window === "undefined") return
    const element = stickyContentRef.current
    if (!element) return

    const updateStickyTop = () => {
      const rect = element.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const nextTop = Math.max((viewportHeight - rect.height) / 2, 40)
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

  useEffect(() => {
    setActiveIndex((prev) => Math.min(prev, Math.max(steps.length - 1, 0)))
  }, [steps.length])

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!steps.length) return
    const clamped = Math.max(0, Math.min(latest, 0.9999))
    const nextIndex = Math.min(steps.length - 1, Math.floor(clamped * steps.length))
    setActiveIndex(nextIndex)
  })

  const scrollToStep = (index: number) => {
    if (typeof window === "undefined") return
    const section = sectionRef.current
    if (!section || !steps.length) return

    const rect = section.getBoundingClientRect()
    const sectionTop = window.scrollY + rect.top
    const scrollRange = section.offsetHeight - window.innerHeight
    if (scrollRange <= 0) return

    const clampedIndex = Math.max(0, Math.min(index, steps.length - 1))
    const targetProgress = (clampedIndex + 0.001) / steps.length
    const targetScroll = sectionTop + targetProgress * scrollRange

    window.scrollTo({ top: targetScroll, behavior: "auto" })
  }

  if (!steps.length) return null

  const totalScrollDistance = steps.length * STEP_SCROLL_DISTANCE

  return (
    <section
      ref={sectionRef}
      className="bg-background text-foreground"
    >
      <div
        className="mx-auto max-w-6xl px-6 py-16"
        style={{ minHeight: `calc(100vh + ${totalScrollDistance}px)` }}
      >
        <div
          className="sticky"
          style={{
            top: stickyTop ?? 40,
            visibility: stickyTop === null ? "hidden" : "visible",
          }}
        >
          <div
            ref={stickyContentRef}
            className={cn(
              "flex flex-col gap-10 lg:flex-row lg:items-center",
              isMediaLeft && "lg:flex-row-reverse"
            )}
          >
            <div className="w-full space-y-4 lg:flex-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Narrative steps
              </p>
              <ul className="space-y-3">
                {steps.map((step, index) => {
                  const isActive = index === activeIndex
                  return (
                    <motion.li
                      key={step.id}
                      className="transition-colors"
                      initial={false}
                      animate={{
                        opacity: isActive ? 1 : 0.55,
                        x: isActive ? 8 : 0,
                      }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                      <button
                        type="button"
                        onClick={() => scrollToStep(index)}
                        className={cn(
                          "w-full cursor-pointer rounded-lg border border-border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                          isActive
                            ? "border-l-4 border-l-primary bg-card shadow-sm"
                            : "bg-muted/40 hover:bg-muted/60"
                        )}
                        aria-current={isActive ? "step" : undefined}
                      >
                        <div className="space-y-1">
                          <p className="text-sm font-semibold text-foreground">{step.title}</p>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      </button>
                    </motion.li>
                  )
                })}
              </ul>
            </div>

            <div className="w-full lg:flex-6">
              <div className="relative aspect-4/3 min-h-80 rounded-lg border border-border bg-muted">
                {steps.map((step, index) => {
                  const isActive = index === activeIndex
                  const inactiveOffset = index < activeIndex ? -18 : 18
                  return (
                    <motion.div
                      key={step.id}
                      className="absolute inset-0"
                      initial={false}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        y: isActive ? 0 : inactiveOffset,
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      style={{ pointerEvents: isActive ? "auto" : "none" }}
                      aria-hidden={!isActive}
                    >
                      <div className="flex h-full items-center justify-center px-6 text-center">
                        <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                            {step.id}
                          </p>
                          <p className="text-2xl font-semibold text-foreground">
                            {step.media.title}
                          </p>
                          <p className="text-sm text-muted-foreground">{step.media.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
                <motion.div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1.5 bg-primary/60"
                  style={{
                    scaleX: smoothProgress,
                    transformOrigin: "0% 50%",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
