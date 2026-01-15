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
import { MapRoute, type Coordinate } from '@/components/prebuild/maps/MapRoute';

const MAP_ROUTE_COORDINATES: ReadonlyArray<Coordinate> = [
  [104.0668, 30.5728],
  [108.9398, 34.3416],
  [113.6254, 34.7466],
  [116.4074, 39.9042],
];

export function MapRoutePreview({ progress }: { progress?: number }) {
  return <MapRoute className="mx-auto max-w-200" route={MAP_ROUTE_COORDINATES} progress={progress} />;
}
```

- Combine with StickySideScrollytelling: See StickySideScrollytelling usage docs.
- Combine with HorizontalTimeline/VerticalTimeline: See HorizontalTimeline/VerticalTimeline usage docs.