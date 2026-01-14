## MapRoute Component Usage

### Props
- `route: ReadonlyArray<Coordinate>`: required. Coordinate = `[longitude, latitude]`. Must be 2–25 points.
- `className?: string`: wrapper class for the map container.
- `MarkerComponent?: ComponentType<MapRouteMarkerRenderProps>`: custom marker UI. Receives `{ point, index, isVisible }`.
- `StatusBadgeComponent?: ComponentType<MapRouteStatusRenderProps>`: custom status badge UI. Receives `{ label, isLoading }`.
- `EmptyStateComponent?: ComponentType<MapRouteEmptyStateRenderProps>`: custom empty state UI. Receives `{ message }`.
- `progress?: number`: 0–1 to reveal the route progressively. If omitted, the full route is shown.

### Notes
- When `MAPBOX_API_TOKEN` is missing, the component renders an empty state message.
- If coordinates are invalid or fewer than two, an error state is shown.

### Examples

- Basic Example:
```tsx
import MapRoute, { type Coordinate } from "@/components/prebuild/maps/MapRoute"

const route: Coordinate[] = [
  [116.391, 39.907],
  [116.397, 39.908],
  [116.403, 39.915],
  [116.410, 39.920],
]

export default function Demo() {
  return <MapRoute route={route} />
}
```

With progress control:
```tsx
import { useState } from "react"
import MapRoute, { type Coordinate } from "@/components/prebuild/maps/MapRoute"

const route: Coordinate[] = [
  [116.391, 39.907],
  [116.397, 39.908],
  [116.403, 39.915],
  [116.410, 39.920],
]

export default function Demo() {
  const [progress, setProgress] = useState(0.5)
  return <MapRoute route={route} progress={progress} />
}
```

- Combine with StickySideScrollytelling: See StickySideScrollytelling usage docs.
- Combine with HorizontalTimeline/VerticalTimeline: See HorizontalTimeline/VerticalTimeline usage docs.