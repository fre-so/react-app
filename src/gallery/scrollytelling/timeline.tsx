import { HorizontalTimeline } from "@/components/scrollytelling/HorizontalTimeline"
import { VerticalTimeline } from "@/components/scrollytelling/VerticalTimeline"
import type {
  TimelineMediaRenderProps,
  TimelineStepRenderProps,
} from "@/components/scrollytelling/timeline/utils"

import { cn } from "@/lib/utils"

import type { ComponentsGalleryNavItem, ControlConfigMap } from "../types"

export const TIMELINE_CONTROLS = {
  mediaSide: {
    label: "Media side",
    options: [
      { label: "Left", value: "left" },
      { label: "Right", value: "right" },
    ],
  },
} as const satisfies ControlConfigMap

export type TimelineControlId = keyof typeof TIMELINE_CONTROLS

const TIMELINE_STEPS = [
  {
    date: "2016 - Origin",
    title: "Signal discovery",
    description:
      "The first insight surfaced from a small pilot and shaped the mission statement.",
    mediaTitle: "Archive snapshot",
  },
  {
    date: "2018 - Build",
    title: "Prototype alignment",
    description:
      "We aligned the core system with user feedback and captured the key milestones.",
    mediaTitle: "Prototype pack",
  },
  {
    date: "2020 - Incident",
    title: "Recovery rehearsal",
    description:
      "A major incident review consolidated the response playbook and handoff flow.",
    mediaTitle: "Postmortem board",
  },
  {
    date: "2022 - Scale",
    title: "Network expansion",
    description:
      "The roadmap shifted from pilots to regional rollouts with tighter checkpoints.",
    mediaTitle: "Route matrix",
  },
  {
    date: "2024 - Launch",
    title: "Momentum release",
    description:
      "The final release connected every stream into a single, memorable narrative.",
    mediaTitle: "Release slate",
  },
]

function VerticalTimelineStepCard({
  stepIndex,
  isActive,
}: TimelineStepRenderProps) {
  const step = TIMELINE_STEPS[stepIndex]

  if (!step) return null

  return (
    <div className="space-y-2 text-left px-4">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
        {step.date}
      </p>
      <h3
        className={cn(
          "text-xl font-semibold",
          isActive ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {step.title}
      </h3>
      <p className="text-sm text-muted-foreground">{step.description}</p>
    </div>
  )
}

function HorizontalTimelineStep({
  stepIndex,
  isActive,
}: TimelineStepRenderProps) {
  const step = TIMELINE_STEPS[stepIndex]

  if (!step) return null

  return (
    <div className="flex flex-col items-center gap-2 text-center">
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
    </div>
  )
}

function TimelineMediaPanel({ stepIndex }: TimelineMediaRenderProps) {
  const step = TIMELINE_STEPS[stepIndex]

  if (!step) return null

  return (
    <div className="flex h-full items-center justify-center bg-muted">
      <span className="text-3xl font-semibold text-foreground">{step.mediaTitle}</span>
    </div>
  )
}

export const VERTICAL_TIMELINE_NAV_ITEM = {
  id: "timeline-vertical",
  title: "Vertical Timeline Scrollytelling",
  controls: ["mediaSide"],
  section: {
    eyebrow: "Scrollytelling",
    description: "Keep the steps detailed while the media stays pinned.",
    render: ({ mediaSide }) => (
      <VerticalTimeline
        steps={TIMELINE_STEPS.length}
        mediaSide={mediaSide}
        StepComponent={VerticalTimelineStepCard}
        MediaComponent={TimelineMediaPanel}
      />
    ),
  },
} satisfies ComponentsGalleryNavItem<TimelineControlId>

export const HORIZONTAL_TIMELINE_NAV_ITEM = {
  id: "timeline-horizontal",
  title: "Horizontal Timeline Scrollytelling",
  controls: [],
  section: {
    eyebrow: "Scrollytelling",
    description: "Scan a lightweight timeline with media below.",
    render: () => (
      <HorizontalTimeline
        steps={TIMELINE_STEPS.length}
        StepComponent={HorizontalTimelineStep}
        MediaComponent={TimelineMediaPanel}
      />
    ),
  },
} satisfies ComponentsGalleryNavItem<TimelineControlId>
