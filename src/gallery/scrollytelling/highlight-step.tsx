import HighlightStepScrollytelling, {
  type HighlightMediaRenderProps,
  type HighlightStepRenderProps,
} from "@/components/prebuild/scrollytelling/HighlightStep"

import type { MediaSide } from "../types"

import { HIGHLIGHT_STEPS } from "./scrollytelling-data"

function HighlightStepCard({ stepIndex }: HighlightStepRenderProps) {
  const step = HIGHLIGHT_STEPS[stepIndex]

  if (!step) return null

  return (
    <div className="space-y-1">
      <p className="text-base font-semibold text-foreground">{step.title}</p>
      <p className="text-sm text-muted-foreground">{step.description}</p>
    </div>
  )
}

function HighlightMedia({ stepIndex }: HighlightMediaRenderProps) {
  const step = HIGHLIGHT_STEPS[stepIndex]

  if (!step) return null

  return (
    <div className="flex h-full items-center justify-center bg-muted">
      <span className="text-3xl font-semibold text-foreground">{step.mediaTitle}</span>
    </div>
  )
}

type HighlightStepSectionProps = {
  mediaSide: MediaSide
}

export function HighlightStepSection({ mediaSide }: HighlightStepSectionProps) {
  return (
    <HighlightStepScrollytelling
      mediaSide={mediaSide}
      steps={HIGHLIGHT_STEPS.length}
      StepComponent={HighlightStepCard}
      MediaComponent={HighlightMedia}
    />
  )
}
