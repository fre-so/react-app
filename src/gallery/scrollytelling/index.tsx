import type { ComponentsGalleryNavItem, ControlConfigMap } from "../types"

import { HighlightStepSection } from "./highlight-step"
import { MapStickySideSection } from "./map-sticky-side"
import { RadarStickySideSection } from "./radar-sticky-side"
import { StickySideSection } from "./sticky-side"
export type { MediaSide } from "../types"

export const SCROLLYTELLING_CONTROLS = {
  mediaSide: {
    label: "Media side",
    options: [
      { label: "Left", value: "left" },
      { label: "Right", value: "right" },
    ],
  },
} as const satisfies ControlConfigMap

export type ScrollytellingControlId = keyof typeof SCROLLYTELLING_CONTROLS

const STICKY_SIDE_NAV_ITEM = {
  id: "sticky-side",
  title: "Sticky Side Scrollytelling",
  controls: ["mediaSide"],
  section: {
    eyebrow: "Scrollytelling",
    description: "Scroll the steps to change the sticky media panel.",
    render: ({ mediaSide }) => <StickySideSection mediaSide={mediaSide} />,
  },
} satisfies ComponentsGalleryNavItem<ScrollytellingControlId>

const HIGHLIGHT_STEP_NAV_ITEM = {
  id: "highlight-step",
  title: "Highlight Step Scrollytelling",
  controls: ["mediaSide"],
  section: {
    eyebrow: "Scrollytelling",
    description: "Keep the steps compact while the media swaps on scroll.",
    render: ({ mediaSide }) => <HighlightStepSection mediaSide={mediaSide} />,
  },
} satisfies ComponentsGalleryNavItem<ScrollytellingControlId>

const MAP_STICKY_SIDE_NAV_ITEM = {
  id: "map-sticky-side",
  title: "Sticky Side Map",
  controls: ["mediaSide"],
  section: {
    eyebrow: "Scrollytelling",
    description: "Move through key markets while the map zooms in.",
    render: ({ mediaSide }) => <MapStickySideSection mediaSide={mediaSide} />,
  },
} satisfies ComponentsGalleryNavItem<ScrollytellingControlId>

const RADAR_STICKY_SIDE_NAV_ITEM = {
  id: "radar-sticky-side",
  title: "Sticky Side Radar Chart",
  controls: ["mediaSide"],
  section: {
    eyebrow: "Scrollytelling",
    description: "Swap the radar profile for each phase of the story.",
    render: ({ mediaSide }) => <RadarStickySideSection mediaSide={mediaSide} />,
  },
} satisfies ComponentsGalleryNavItem<ScrollytellingControlId>

export const SCROLLYTELLING_NAV_ITEMS = [
  STICKY_SIDE_NAV_ITEM,
  MAP_STICKY_SIDE_NAV_ITEM,
  RADAR_STICKY_SIDE_NAV_ITEM,
  HIGHLIGHT_STEP_NAV_ITEM,
] satisfies ComponentsGalleryNavItem<ScrollytellingControlId>[]
