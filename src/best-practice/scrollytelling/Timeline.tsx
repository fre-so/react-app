import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react"
import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

type TimelineStep = {
  id: string
  date: string
  title: string
  description: string
  tags?: string[]
  media: {
    title: string
  }
}

type TimelineScrollytellingProps = {
  steps?: TimelineStep[]
  orientation?: "horizontal" | "vertical"
  mediaSide?: "left" | "right"
}

const STEP_SCROLL_DISTANCE = 360

const DEFAULT_STEPS: TimelineStep[] = [
  {
    id: "2016",
    date: "2016 - Origin",
    title: "Signal discovery",
    description:
      "The first insight surfaced from a small pilot and shaped the mission statement.",
    tags: ["History", "Research"],
    media: {
      title: "Archive snapshot",
    },
  },
  {
    id: "2018",
    date: "2018 - Build",
    title: "Prototype alignment",
    description:
      "We aligned the core system with user feedback and captured the key milestones.",
    tags: ["Project", "Prototype"],
    media: {
      title: "Prototype pack",
    },
  },
  {
    id: "2020",
    date: "2020 - Incident",
    title: "Recovery rehearsal",
    description:
      "A major incident review consolidated the response playbook and handoff flow.",
    tags: ["Review", "Operations"],
    media: {
      title: "Postmortem board",
    },
  },
  {
    id: "2022",
    date: "2022 - Scale",
    title: "Network expansion",
    description:
      "The roadmap shifted from pilots to regional rollouts with tighter checkpoints.",
    tags: ["Roadmap", "Delivery"],
    media: {
      title: "Route matrix",
    },
  },
  {
    id: "2024",
    date: "2024 - Launch",
    title: "Momentum release",
    description:
      "The final release connected every stream into a single, memorable narrative.",
    tags: ["Launch", "Impact"],
    media: {
      title: "Release slate",
    },
  },
]

export default function TimelineScrollytelling({
  steps = DEFAULT_STEPS,
  orientation = "horizontal",
  mediaSide = "right",
}: TimelineScrollytellingProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const stickyContentRef = useRef<HTMLDivElement | null>(null)
  const mediaFrameRef = useRef<HTMLDivElement | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [stickyTop, setStickyTop] = useState<number | null>(null)
  const isVertical = orientation === "vertical"
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
    const element = isVertical ? mediaFrameRef.current : stickyContentRef.current
    if (!element) return

    const updateStickyTop = () => {
      const rect = element.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const minTop = isVertical ? 0 : 40
      const nextTop = Math.max((viewportHeight - rect.height) / 2, minTop)
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
  }, [isVertical])

  useEffect(() => {
    setActiveIndex((prev) => Math.min(prev, Math.max(steps.length - 1, 0)))
  }, [steps.length])

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!steps.length) return
    const clamped = Math.max(0, Math.min(latest, 1))
    const nextIndex = Math.min(steps.length - 1, Math.floor(clamped * (steps.length - 1)))
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
    const targetProgress = (clampedIndex + 0.001) / (steps.length - 1)
    const targetScroll = sectionTop + targetProgress * scrollRange

    window.scrollTo({ top: targetScroll, behavior: "auto" })
  }

  if (!steps.length) return null

  const totalScrollDistance = steps.length * STEP_SCROLL_DISTANCE
  const lineInset = steps.length > 1 ? `${50 / steps.length}%` : "50%"

  return (
    <section
      ref={sectionRef}
      className="bg-background text-foreground"
    >
      {isVertical ? (
        <div
          className={cn(
            "mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16 lg:flex-row",
            isMediaLeft && "lg:flex-row-reverse"
          )}
        >
          <div className="flex-1">
            <div className="relative">
              <div
                className="absolute left-3.75 w-0.5 bg-border"
                style={{ top: lineInset, bottom: lineInset }}
              >
                <motion.div
                  className="w-full h-full bg-primary/70"
                  style={{
                    scaleY: smoothProgress,
                    transformOrigin: "0% 0%",
                  }}
                />
              </div>
              <ol>
                {steps.map((step, index) => {
                  const isActive = index === activeIndex
                  const isPassed = index < activeIndex
                  return (
                    <li
                      key={step.id}
                      className="relative flex min-h-[62vh] items-center"
                    >
                      <button
                        type="button"
                        onClick={() => scrollToStep(index)}
                        className="group relative flex w-full cursor-pointer items-center text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 pl-8"
                        aria-current={isActive ? "step" : undefined}
                      >
                        <span
                          className={cn(
                            "absolute left-4 top-1/2 flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 transition-colors group-hover:border-primary group-hover:bg-primary",
                            isActive
                              ? "border-primary bg-primary ring-4 ring-primary/20"
                              : isPassed
                                ? "border-primary bg-primary"
                                : "border-muted-foreground/40 bg-background"
                          )}
                        />
                        <div
                          className={cn(
                            "w-full rounded-lg p-5 transition-colors",
                            isActive
                              ? "bg-muted"
                              : "group-hover:bg-muted"
                          )}
                        >
                          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                            {step.date}
                          </p>
                          <h3 className={cn("mt-2 text-xl font-semibold", isActive ? "text-foreground" : "text-muted-foreground")}>
                            {step.title}
                          </h3>
                          <p className="mt-2 text-sm text-muted-foreground">
                            {step.description}
                          </p>
                          {step.tags?.length ? (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {step.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-full border border-border px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-muted-foreground"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          ) : null}
                        </div>
                        <span className="sr-only">{step.title}</span>
                      </button>
                    </li>
                  )
                })}
              </ol>
            </div>
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
                className="relative aspect-4/5 min-h-96 overflow-hidden rounded-xl border border-border bg-muted"
              >
                {steps.map((step, index) => {
                  const isActive = index === activeIndex
                  const inactiveOffset = index < activeIndex ? -24 : 24
                  return (
                    <motion.div
                      key={step.id}
                      className="absolute inset-0 p-6"
                      initial={false}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        y: isActive ? 0 : inactiveOffset,
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      style={{ pointerEvents: isActive ? "auto" : "none" }}
                      aria-hidden={!isActive}
                    >
                      <div className="flex h-full items-center justify-center">
                        <span className="text-3xl font-semibold text-foreground">
                          {step.title}
                        </span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
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
              className="flex flex-col gap-8"
            >
              <div className="w-full space-y-6">
                <div className="relative">
                  <div
                    className="absolute top-1.25 h-0.5 bg-border"
                    style={{ left: lineInset, right: lineInset }}
                  >
                    <motion.div
                      className="w-full h-full bg-primary/70"
                      style={{
                        scaleX: smoothProgress,
                        transformOrigin: "0% 50%",
                      }}
                    />
                  </div>
                  <ul className="relative flex items-start justify-between">
                    {steps.map((step, index) => {
                      const isActive = index === activeIndex
                      const isPassed = index < activeIndex
                      return (
                        <li
                          key={step.id}
                          className="relative flex flex-1 flex-col items-center text-center"
                        >
                          <button
                            type="button"
                            onClick={() => scrollToStep(index)}
                            className="group flex cursor-pointer flex-col items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                            aria-current={isActive ? "step" : undefined}
                          >
                            <span
                              className={cn(
                                "flex h-3 w-3 items-center justify-center rounded-full border-2 transition-colors group-hover:border-primary group-hover:bg-primary",
                                isActive
                                  ? "border-primary bg-primary ring-4 ring-primary/20"
                                  : isPassed
                                    ? "border-primary bg-primary"
                                    : "border-muted-foreground/40 bg-background"
                              )}
                            />
                            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                              {step.date}
                            </span>
                            <span
                              className={cn(
                                "text-sm font-semibold transition-colors group-hover:text-foreground",
                                isActive ? "text-foreground" : "text-muted-foreground"
                              )}
                            >
                              {step.title}
                            </span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>

              <div className="w-full">
                <div className="relative min-h-88 overflow-hidden rounded-xl border border-border bg-muted">
                  {steps.map((step, index) => {
                    const isActive = index === activeIndex
                    const inactiveOffset = index < activeIndex ? -20 : 20
                    return (
                      <motion.div
                        key={step.id}
                        className="absolute inset-0 p-6"
                        initial={false}
                        animate={{
                          opacity: isActive ? 1 : 0,
                          y: isActive ? 0 : inactiveOffset,
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        style={{ pointerEvents: isActive ? "auto" : "none" }}
                        aria-hidden={!isActive}
                      >
                        <div className="flex h-full items-center justify-center">
                        <span className="text-3xl font-semibold text-foreground">
                          {step.title}
                        </span>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
