import type { ComponentsGalleryNavItem, ControlConfigMap } from "../types"

import {
  HIGHLIGHT_STEP_CONTROLS,
  HIGHLIGHT_STEP_NAV_ITEM,
  type HighlightStepControlId,
} from "./highlight-step"
import {
  STICKY_SIDE_CONTROLS,
  STICKY_SIDE_NAV_ITEM,
  type StickySideControlId,
} from "./sticky-side"
import {
  HORIZONTAL_TIMELINE_NAV_ITEM,
  TIMELINE_CONTROLS,
  VERTICAL_TIMELINE_NAV_ITEM,
  type TimelineControlId,
} from "./timeline"

export type { MediaSide } from "../types"

export const SCROLLYTELLING_CONTROLS = {
  ...STICKY_SIDE_CONTROLS,
  ...HIGHLIGHT_STEP_CONTROLS,
  ...TIMELINE_CONTROLS,
} as const satisfies ControlConfigMap

export type ScrollytellingControlId =
  | StickySideControlId
  | HighlightStepControlId
  | TimelineControlId

export const SCROLLYTELLING_NAV_ITEMS = [
  STICKY_SIDE_NAV_ITEM,
  HIGHLIGHT_STEP_NAV_ITEM,
  VERTICAL_TIMELINE_NAV_ITEM,
  HORIZONTAL_TIMELINE_NAV_ITEM,
] satisfies ComponentsGalleryNavItem<ScrollytellingControlId>[]
