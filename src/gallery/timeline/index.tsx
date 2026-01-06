import type { ComponentsGalleryNavItem } from "../types"

import {
  HORIZONTAL_TIMELINE_NAV_ITEM,
  TIMELINE_CONTROLS,
  VERTICAL_TIMELINE_NAV_ITEM,
  type TimelineControlId,
} from "./timeline"

export { TIMELINE_CONTROLS }
export type { TimelineControlId }

export const TIMELINE_NAV_ITEMS = [
  VERTICAL_TIMELINE_NAV_ITEM,
  HORIZONTAL_TIMELINE_NAV_ITEM,
] satisfies ComponentsGalleryNavItem<TimelineControlId>[]
