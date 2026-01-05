import MapRoute, { type Coordinate } from "@/components/maps/MapRoute"

import type { ComponentsGalleryNavItem, ControlConfigMap } from "../types"

const MAP_ROUTE_COORDINATES: ReadonlyArray<Coordinate> = [
  [104.0668, 30.5728],
  [108.9398, 34.3416],
  [113.6254, 34.7466],
  [116.4074, 39.9042],
]

export const MAP_ROUTE_CONTROLS = {
  mapRouteProgress: {
    label: "Route progress",
    options: [
      { label: "0%", value: "0" },
      { label: "25%", value: "0.25" },
      { label: "50%", value: "0.5" },
      { label: "75%", value: "0.75" },
      { label: "100%", value: "1" },
    ],
  },
} as const satisfies ControlConfigMap

export type MapRouteControlId = keyof typeof MAP_ROUTE_CONTROLS

export const MAP_ROUTE_NAV_ITEM = {
  id: "map-route",
  title: "Map Route",
  controls: ["mapRouteProgress"],
  section: {
    eyebrow: "Maps",
    description: "Preview the Chengdu to Beijing route and auto-fit bounds.",
    render: ({ mapRouteProgress }) => (
      <MapRoute
        className="mx-auto max-w-200"
        route={MAP_ROUTE_COORDINATES}
        progress={mapRouteProgress}
      />
    ),
  },
} satisfies ComponentsGalleryNavItem<MapRouteControlId>
