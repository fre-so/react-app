import type { ComponentsGalleryNavItem, ControlConfigMap } from "../types"

import {
  MAP_ROUTE_CONTROLS,
  MAP_ROUTE_NAV_ITEM,
  type MapRouteControlId,
} from "./map-route"
import {
  MAP_TIMELINE_CONTROLS,
  MAP_TIMELINE_NAV_ITEM,
  type MapTimelineControlId,
} from "./map-timeline"

export const MAPS_CONTROLS = {
  ...MAP_ROUTE_CONTROLS,
  ...MAP_TIMELINE_CONTROLS,
} as const satisfies ControlConfigMap

export type MapsControlId = MapRouteControlId | MapTimelineControlId

export const MAPS_NAV_ITEMS = [
  MAP_ROUTE_NAV_ITEM,
  MAP_TIMELINE_NAV_ITEM,
] satisfies ComponentsGalleryNavItem<MapsControlId>[]
