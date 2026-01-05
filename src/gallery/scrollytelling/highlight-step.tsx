import HighlightStepScrollytelling, {
  type HighlightMediaRenderProps,
  type HighlightStepRenderProps,
} from "@/components/scrollytelling/HighlightStep"

import type { ComponentsGalleryNavItem, ControlConfigMap } from "../types"

export const HIGHLIGHT_STEP_CONTROLS = {
  mediaSide: {
    label: "Media side",
    options: [
      { label: "Left", value: "left" },
      { label: "Right", value: "right" },
    ],
  },
} as const satisfies ControlConfigMap

export type HighlightStepControlId = keyof typeof HIGHLIGHT_STEP_CONTROLS

const HIGHLIGHT_STEPS = [
  {
    title: "Define the question",
    description:
      "Anchor the narrative around the decision you want the reader to make. Keep the scope tight and explicit.",
    mediaTitle: "Placeholder Media A",
  },
  {
    title: "Surface the tension",
    description:
      "Highlight what breaks today and why it matters. One or two sentences is enough to create momentum.",
    mediaTitle: "Placeholder Media B",
  },
  {
    title: "Contrast the options",
    description:
      "Compare two approaches side by side, calling out the trade-offs in a single concise line.",
    mediaTitle: "Placeholder Media C",
  },
  {
    title: "Commit to the shift",
    description:
      "Close with the next step and the impact. Make the transition feel deliberate, not abrupt.",
    mediaTitle: "Placeholder Media D",
  },
]

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

export const HIGHLIGHT_STEP_NAV_ITEM = {
  id: "highlight-step",
  title: "Highlight Step Scrollytelling",
  controls: ["mediaSide"],
  section: {
    eyebrow: "Scrollytelling",
    description: "Keep the steps compact while the media swaps on scroll.",
    render: ({ mediaSide }) => (
      <HighlightStepScrollytelling
        mediaSide={mediaSide}
        steps={HIGHLIGHT_STEPS.length}
        StepComponent={HighlightStepCard}
        MediaComponent={HighlightMedia}
      />
    ),
  },
} satisfies ComponentsGalleryNavItem<HighlightStepControlId>
