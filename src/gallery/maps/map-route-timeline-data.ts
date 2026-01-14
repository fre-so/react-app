import type { Coordinate } from '@/components/prebuild/maps/MapRoute';

export const MAP_TIMELINE_STEPS = [
  {
    label: 'Chengdu',
    title: 'Western gateway',
    description: 'Start the cross-country story with a steady climb.',
    coordinate: [104.0668, 30.5728] as Coordinate,
  },
  {
    label: "Xi'an",
    title: 'Historic core',
    description: 'Pass through the heritage capital with a tighter arc.',
    coordinate: [108.9398, 34.3416] as Coordinate,
  },
  {
    label: 'Zhengzhou',
    title: 'Signal midpoint',
    description: 'Align the route around the central transit corridor.',
    coordinate: [113.6254, 34.7466] as Coordinate,
  },
  {
    label: 'Beijing',
    title: 'Northern arrival',
    description: 'Close the timeline with a fast, clean approach.',
    coordinate: [116.4074, 39.9042] as Coordinate,
  },
];

export const MAP_TIMELINE_ROUTE = MAP_TIMELINE_STEPS.map((stop) => stop.coordinate);
