import { HorizontalTimeline } from "@/components/prebuild/timeline/HorizontalTimeline"
import type {
  TimelineMediaRenderProps,
  TimelineStepRenderProps,
} from "@/components/prebuild/timeline/utils"
import { cn } from "@/lib/utils"

import { TIMELINE_STEPS } from "./timeline-data"

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
      <span className="text-3xl font-semibold text-foreground">
        {step.mediaTitle}
      </span>
    </div>
  )
}

export function HorizontalTimelineSection() {
  return (
    <HorizontalTimeline
      steps={TIMELINE_STEPS.length}
      StepComponent={HorizontalTimelineStep}
      MediaComponent={TimelineMediaPanel}
    />
  )
}
