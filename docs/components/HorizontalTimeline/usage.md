## HorizontalTimeline Component Usage

### Props
- `steps?: number`: step count, default `5`, max `8`.
- `stepScrollDistance?: number`: extra scroll distance per step, default `360`. Overall height ~ `100vh + steps * stepScrollDistance`.
- `className?: string`: section wrapper class.
- `stepClassName?: string`: step content wrapper class.
- `mediaClassName?: string`: media wrapper class.
- `mediaMinHeight?: string`: media minimum height, default `"50vh"`.
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

Note: only *adjacent* steps with the same key are merged.

```ts
getMediaKey={(index) => (index < 2 ? "intro" : "details")}
```

### Examples

- Basic Example:
```tsx
import { HorizontalTimeline } from "@/components/prebuild/timeline/HorizontalTimeline"

const phases = [
  { label: "Explore", media: "/img/p1.png" },
  { label: "Validate", media: "/img/p2.png" },
  { label: "Ship", media: "/img/p3.png" },
  { label: "Scale", media: "/img/p4.png" },
]

function Step({ stepIndex, isActive }: { stepIndex: number; isActive: boolean }) {
  const item = phases[stepIndex]
  return (
    <div className={isActive ? "text-foreground" : "text-muted-foreground"}>
      <div className="text-sm font-semibold">{item.label}</div>
    </div>
  )
}

function Media({ stepIndex }: { stepIndex: number }) {
  const item = phases[stepIndex]
  return (
    <img
      src={item.media}
      alt={item.label}
      className="h-full w-full rounded-xl object-cover"
    />
  )
}

export default function Demo() {
  return (
    <HorizontalTimeline
      steps={phases.length}
      stepScrollDistance={320}
      mediaMinHeight="55vh"
      StepComponent={Step}
      MediaComponent={Media}
    />
  )
}
```

- Use MapRoute component as MediaComponent:
```tsx
import { useEffect, useState } from 'react';
import { useMotionValueEvent } from 'motion/react';
import { HorizontalTimeline } from '@/components/prebuild/timeline/HorizontalTimeline';
import { MapRoute } from '@/components/prebuild/maps/MapRoute';
import type { TimelineMediaRenderProps, TimelineStepRenderProps } from '@/components/prebuild/timeline/utils';
import { MAP_TIMELINE_ROUTE, MAP_TIMELINE_STEPS } from './map-route-timeline-data';
import { cn } from '@/lib/utils';

function MapRouteTimelineStep({ stepIndex, isActive }: TimelineStepRenderProps) {
  const step = MAP_TIMELINE_STEPS[stepIndex];
  if (!step) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
        {step.label}
      </span>
      <span
        className={cn(
          'text-sm font-semibold transition-colors group-hover:text-foreground',
          isActive ? 'text-foreground' : 'text-muted-foreground'
        )}
      >
        {step.title}
      </span>
      <span className="text-[0.65rem] text-muted-foreground">
        {`${step.coordinate[0].toFixed(2)}°, ${step.coordinate[1].toFixed(2)}°`}
      </span>
    </div>
  );
}

const clampProgress = (value: number) => Math.min(1, Math.max(0, value));

function MapRouteTimelineMedia({ scrollProgress }: TimelineMediaRenderProps) {
  const [progress, setProgress] = useState(() => clampProgress(scrollProgress.get()));

  useEffect(() => {
    setProgress(clampProgress(scrollProgress.get()));
  }, [scrollProgress]);

  useMotionValueEvent(scrollProgress, 'change', (latest) => {
    setProgress(clampProgress(latest));
  });

  return <MapRoute route={MAP_TIMELINE_ROUTE} className="w-full h-full" progress={progress} />;
}

export default function MapRouteTimelineDemo() {
  return (
    <HorizontalTimeline
      steps={MAP_TIMELINE_STEPS.length}
      getMediaKey={() => 'map-route'}
      StepComponent={MapRouteTimelineStep}
      MediaComponent={MapRouteTimelineMedia}
    />
  );
}
```

- Use Chart component as MediaComponent:
```tsx
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

import { HorizontalTimeline } from '@/components/prebuild/timeline/HorizontalTimeline';
import type { TimelineMediaRenderProps, TimelineStepRenderProps } from '@/components/prebuild/timeline/utils';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { cn } from '@/lib/utils';

import { CHART_TIMELINE_CONFIG, CHART_TIMELINE_DATASETS, CHART_TIMELINE_STEPS } from './timeline-chart-data';

function LineChartTimelineStep({ stepIndex, isActive }: TimelineStepRenderProps) {
  const step = CHART_TIMELINE_STEPS[stepIndex];
  if (!step) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
        {step.label}
      </span>
      <span
        className={cn(
          'text-sm font-semibold transition-colors group-hover:text-foreground',
          isActive ? 'text-foreground' : 'text-muted-foreground'
        )}
      >
        {step.title}
      </span>
      <span className="text-[0.65rem] text-muted-foreground">{step.range}</span>
    </div>
  );
}

function LineChartTimelineMedia({ stepIndex }: TimelineMediaRenderProps) {
  const data = CHART_TIMELINE_DATASETS[stepIndex] ?? CHART_TIMELINE_DATASETS[0];

  return (
    <div className="flex h-full w-full flex-col gap-4 bg-muted/30 p-6">
      <ChartContainer config={CHART_TIMELINE_CONFIG} className="h-full min-h-80 w-full">
        <LineChart data={data}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="period" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Line
            dataKey="uv"
            type="monotone"
            stroke="var(--color-uv)"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            dataKey="pv"
            type="monotone"
            stroke="var(--color-pv)"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}

export default function LineChartHorizontalTimelineDemo() {
  return (
    <HorizontalTimeline
      steps={CHART_TIMELINE_STEPS.length}
      getMediaKey={() => 'line-chart'}
      StepComponent={LineChartTimelineStep}
      MediaComponent={LineChartTimelineMedia}
    />
  );
}
```
