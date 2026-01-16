### StickySideScrollytelling Component Usage

### Props
- `steps?: number`: step count, default `5`. Match your data length.
- `mediaSide?: "left" | "right"`: media column position on large screens.
- `scrollContainerRef?: RefObject<HTMLElement | null>`: pass a scroll container ref if using a non-window scroller.
- `className?: string`: section wrapper class.
- `stepClassName?: string`: wrapper class for each step.
- `mediaClassName?: string`: wrapper class for media area.
- `stepMinHeight?: string`: per-step minimum height, default `"80vh"`.
- `stepRatio?: number`: step column width ratio (0–1). Media uses `1 - stepRatio`. Default `0.5`. Set smaller for wider media.
- `getMediaKey?: (stepIndex) => string | number`: group adjacent steps by key.
- `StepComponent`: required, renders step content.
- `MediaComponent`: required, renders media content.

### StepComponent / MediaComponent
All components require two render components:
- `StepComponent`: renders each step's text or card content.
- `MediaComponent`: renders the corresponding media (image, video, chart, map, etc.).

They receive similar render props:

```ts
type RenderProps = {
  stepIndex: number
  isActive: boolean
  scrollProgress: MotionValue<number>
}
```

- `stepIndex`: current step index to read your data.
- `isActive`: whether the step is currently active (for highlighting).
- `scrollProgress`: 0-1 MotionValue for transforms or progress bars.
- StepComponent `scrollProgress` tracks the *section-level* progress (0-1).
- MediaComponent `scrollProgress` tracks the *media group* progress (0-1).

### getMediaKey (media grouping)
`getMediaKey` groups adjacent steps into a single "media group". The MediaComponent stays mounted within a group, and its `scrollProgress` runs from 0 to 1 across all steps in that group.

### Examples

- Basic Example:
```tsx
import { StickySideScrollytelling } from "@/components/prebuild/scrollytelling/StickySide"

const data = [
  { title: "Find the issue", body: "Users drop on step 2.", media: "/img/01.png" },
  { title: "Locate cause", body: "Heatmap shows low visibility.", media: "/img/02.png" },
  { title: "Propose fix", body: "Adjust layout and copy.", media: "/img/03.png" },
  { title: "Result", body: "Conversion up 18%.", media: "/img/04.png" },
]

function Step({ stepIndex, isActive }: { stepIndex: number; isActive: boolean }) {
  const item = data[stepIndex]
  return (
    <div className={isActive ? "text-foreground" : "text-muted-foreground"}>
      <h3 className="text-lg font-semibold">{item.title}</h3>
      <p className="mt-2 text-sm">{item.body}</p>
    </div>
  )
}

function Media({ stepIndex }: { stepIndex: number }) {
  const item = data[stepIndex]
  return (
    <img
      src={item.media}
      alt={item.title}
      className="h-full w-full rounded-xl object-cover"
    />
  )
}

export default function Demo() {
  return (
    <StickySideScrollytelling
      steps={data.length}
      mediaSide="right"
      stepMinHeight="70vh"
      StepComponent={Step}
      MediaComponent={Media}
    />
  )
}
```

- Use Map component as MediaComponent:
```tsx
import { useEffect, useRef, useState } from 'react';
import Map, { Marker, type MapRef } from 'react-map-gl/mapbox';

import {
  StickySideScrollytelling,
  type StickySideMediaRenderProps,
  type StickySideStepRenderProps,
} from '@/components/prebuild/scrollytelling/StickySide';
import { cn } from '@/lib/utils';

import type { MediaSide } from '../types';
import { MAP_STICKY_STEPS } from './scrollytelling-data';

import 'mapbox-gl/dist/mapbox-gl.css';

function MapStickySideStep({ stepIndex, isActive }: StickySideStepRenderProps) {
  const step = MAP_STICKY_STEPS[stepIndex];

  if (!step) return null;

  return (
    <div className={cn('w-full rounded-lg border border-border/60 p-4 transition-colors', isActive && 'border-border')}>
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{step.kicker}</p>
      <h3 className="mt-2 text-2xl font-semibold text-foreground">{step.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{step.location}</p>
    </div>
  );
}

function MapStickySideMedia({ stepIndex }: StickySideMediaRenderProps) {
  const step = MAP_STICKY_STEPS[stepIndex] ?? MAP_STICKY_STEPS[0];
  const mapboxToken = import.meta.env.MAPBOX_API_TOKEN as string | undefined;
  const mapRef = useRef<MapRef | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    if (!step || !isMapReady || !mapRef.current) return;
    mapRef.current.flyTo({
      center: step.coordinate,
      zoom: step.zoom,
      duration: 1200,
      essential: true,
    });
  }, [isMapReady, step]);

  if (!step) return null;

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg border border-border">
      <Map
        ref={mapRef}
        mapboxAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        initialViewState={{
          longitude: step.coordinate[0],
          latitude: step.coordinate[1],
          zoom: step.zoom,
        }}
        onLoad={() => setIsMapReady(true)}
        scrollZoom={false}
        dragPan={false}
        reuseMaps
        style={{ width: '100%', height: '100%' }}
        preserveDrawingBuffer={true}
      >
        <Marker longitude={step.coordinate[0]} latitude={step.coordinate[1]} anchor="center">
          <div className="h-3 w-3 rounded-full bg-primary shadow ring-4 ring-primary/20" />
        </Marker>
      </Map>

      <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground shadow">
        {step.location}
      </div>
    </div>
  );
}

type MapStickySideSectionProps = {
  mediaSide: MediaSide;
};

export function MapStickySideSection({ mediaSide }: MapStickySideSectionProps) {
  return (
    <StickySideScrollytelling
      mediaSide={mediaSide}
      steps={MAP_STICKY_STEPS.length}
      getMediaKey={() => 'map-sticky'}
      StepComponent={MapStickySideStep}
      MediaComponent={MapStickySideMedia}
    />
  );
}
```

- Use Chart component as MediaComponent:
```tsx
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

import {
  StickySideScrollytelling,
  type StickySideMediaRenderProps,
  type StickySideStepRenderProps,
} from '@/components/prebuild/scrollytelling/StickySide';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { cn } from '@/lib/utils';

import type { MediaSide } from '../types';
import { RADAR_STICKY_CONFIG, RADAR_STICKY_DATASETS, RADAR_STICKY_STEPS } from './scrollytelling-data';

function RadarStickySideStep({ stepIndex, isActive }: StickySideStepRenderProps) {
  const step = RADAR_STICKY_STEPS[stepIndex];

  if (!step) return null;

  return (
    <div className={cn('w-full rounded-lg border border-border/60 p-4 transition-colors', isActive && 'border-border')}>
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{step.kicker}</p>
      <h3 className="mt-2 text-2xl font-semibold text-foreground">{step.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{step.label}</p>
    </div>
  );
}

function RadarStickySideMedia({ stepIndex }: StickySideMediaRenderProps) {
  const step = RADAR_STICKY_STEPS[stepIndex] ?? RADAR_STICKY_STEPS[0];
  const data = RADAR_STICKY_DATASETS[stepIndex] ?? RADAR_STICKY_DATASETS[0];

  if (!step || !data) return null;

  return (
    <div className="flex h-full w-full flex-col gap-4 rounded-lg border border-border bg-muted/20 p-6">
      <div className="space-y-1">
        <p className="text-sm text-center font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          {step.kicker}
        </p>
        <p className="text-base text-center font-medium text-foreground">{step.label}</p>
      </div>
      <ChartContainer config={RADAR_STICKY_CONFIG} className="h-full min-h-80 w-full">
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="dimension" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Radar dataKey="uv" stroke="var(--color-uv)" fill="var(--color-uv)" fillOpacity={0.2} />
          <Radar dataKey="pv" stroke="var(--color-pv)" fill="var(--color-pv)" fillOpacity={0.2} />
        </RadarChart>
      </ChartContainer>
    </div>
  );
}

type RadarStickySideSectionProps = {
  mediaSide: MediaSide;
};

export function RadarStickySideSection({ mediaSide }: RadarStickySideSectionProps) {
  return (
    <StickySideScrollytelling
      mediaSide={mediaSide}
      steps={RADAR_STICKY_STEPS.length}
      stepRatio={0.4}
      stepMinHeight="60vh"
      getMediaKey={() => 'radar-sticky'}
      StepComponent={RadarStickySideStep}
      MediaComponent={RadarStickySideMedia}
    />
  );
}
```
