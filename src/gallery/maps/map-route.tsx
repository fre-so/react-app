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
