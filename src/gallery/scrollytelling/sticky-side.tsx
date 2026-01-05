import StickySideScrollytelling, {
  type StickySideMediaRenderProps,
  type StickySideStepRenderProps,
} from "@/components/scrollytelling/StickySide"

import { cn } from "@/lib/utils"

import type { ComponentsGalleryNavItem, ControlConfigMap } from "../types"

export const STICKY_SIDE_CONTROLS = {
  mediaSide: {
    label: "Media side",
    options: [
      { label: "Left", value: "left" },
      { label: "Right", value: "right" },
    ],
  },
} as const satisfies ControlConfigMap

export type StickySideControlId = keyof typeof STICKY_SIDE_CONTROLS

const STICKY_SIDE_STEPS = [
  {
    kicker: "Step 01",
    title: "Signal Discovery",
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed urna in nisi posuere consequat. Ut blandit neque vitae justo vulputate. Integer varius sapien vitae odio fringilla, sed commodo erat interdum. Mauris accumsan velit ut nibh cursus, ac aliquam lacus pulvinar. Curabitur gravida nunc at ligula fermentum, a aliquet justo malesuada.",
    mediaTitle: "Placeholder Media A",
  },
  {
    kicker: "Step 02",
    title: "Pattern Alignment",
    body:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Eu tincidunt tortor aliquam nulla facilisi cras fermentum odio. Egestas maecenas pharetra convallis posuere morbi leo urna molestie at. Quisque vel lacus faucibus, posuere libero in, congue lectus. Maecenas sed cursus nunc, vitae pellentesque est.",
    mediaTitle: "Placeholder Media B",
  },
  {
    kicker: "Step 03",
    title: "Prototype Drift",
    body:
      "Quis ipsum suspendisse ultrices gravida. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Semper feugiat nibh sed pulvinar proin gravida hendrerit lectus. Ultricies mi eget mauris pharetra et ultrices neque ornare aenean. Integer at neque non quam cursus faucibus in in quam. Duis volutpat velit sit amet mi efficitur, nec commodo nunc sodales.",
    mediaTitle: "Placeholder Media C",
  },
  {
    kicker: "Step 04",
    title: "Scale Rehearsal",
    body:
      "Nisl nunc mi ipsum faucibus vitae aliquet nec. Amet facilisis magna etiam tempor orci eu lobortis elementum. Consequat mauris nunc congue nisi vitae suscipit tellus mauris a. Enim eu turpis egestas pretium aenean pharetra magna ac. Nulla facilisi morbi tempus iaculis urna id volutpat. Fusce aliquet sem vel orci hendrerit, non mattis lectus tempor.",
    mediaTitle: "Placeholder Media D",
  },
  {
    kicker: "Step 05",
    title: "Launch Narrative",
    body:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Magna etiam tempor orci eu. Aliquam vestibulum morbi blandit cursus risus at ultrices mi tempus. Risus ultricies tristique nulla aliquet enim tortor at auctor. Cras fermentum odio eu feugiat pretium nibh ipsum consequat. Sed sed viverra ipsum nunc aliquet bibendum enim facilisis.",
    mediaTitle: "Placeholder Media E",
  },
]

function StickySideStepCard({ stepIndex, isActive }: StickySideStepRenderProps) {
  const step = STICKY_SIDE_STEPS[stepIndex]

  return (
    <div
      className={cn(
        "w-full rounded-lg border border-border/60 p-4 transition-colors",
        isActive && "border-border"
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
        {step.kicker}
      </p>
      <h3 className="mt-2 text-2xl font-semibold text-foreground">{step.title}</h3>
      <p className="mt-2 text-base text-muted-foreground">{step.body}</p>
    </div>
  )
}

function StickySideMedia({ stepIndex }: StickySideMediaRenderProps) {
  const step = STICKY_SIDE_STEPS[stepIndex]

  return (
    <div className="flex h-full items-center justify-center bg-muted">
      <span className="text-3xl font-semibold text-foreground">{step.mediaTitle}</span>
    </div>
  )
}

export const STICKY_SIDE_NAV_ITEM = {
  id: "sticky-side",
  title: "Sticky Side Scrollytelling",
  controls: ["mediaSide"],
  section: {
    eyebrow: "Scrollytelling",
    description: "Scroll the steps to change the sticky media panel.",
    render: ({ mediaSide }) => (
      <StickySideScrollytelling
        mediaSide={mediaSide}
        steps={STICKY_SIDE_STEPS.length}
        StepComponent={StickySideStepCard}
        MediaComponent={StickySideMedia}
      />
    ),
  },
} satisfies ComponentsGalleryNavItem<StickySideControlId>
