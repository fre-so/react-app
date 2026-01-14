## VerticalTimeline Component Usage

### Props
- `steps?: number`: step count, default `5`, max `8`.
- `mediaSide?: "left" | "right"`: media position on large screens.
- `className?: string`: section wrapper class.
- `stepClassName?: string`: step content wrapper class.
- `mediaClassName?: string`: media wrapper class.
- `stepRatio?: number`: step column width ratio (0-1), default `0.5`.
- `stepMinHeight?: string`: per-step minimum height, default `"80vh"`.
- `mediaMinHeight?: string`: media minimum height, default `"80vh"`.
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
import { VerticalTimeline } from "@/components/prebuild/timeline/VerticalTimeline"

const timeline = [
  { year: "2021", title: "Kickoff", media: "/img/t1.png" },
  { year: "2022", title: "Beta", media: "/img/t2.png" },
  { year: "2023", title: "Launch", media: "/img/t3.png" },
  { year: "2024", title: "Scale", media: "/img/t4.png" },
]

function Step({ stepIndex, isActive }: { stepIndex: number; isActive: boolean }) {
  const item = timeline[stepIndex]
  return (
    <div className={isActive ? "text-foreground" : "text-muted-foreground"}>
      <div className="text-xs uppercase tracking-wide">{item.year}</div>
      <div className="mt-1 text-base font-semibold">{item.title}</div>
    </div>
  )
}

function Media({ stepIndex }: { stepIndex: number }) {
  const item = timeline[stepIndex]
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
    <VerticalTimeline
      steps={timeline.length}
      stepRatio={0.55}
      stepMinHeight="65vh"
      mediaMinHeight="70vh"
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
import { VerticalTimeline } from '@/components/prebuild/timeline/VerticalTimeline';
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
    <div className="space-y-2 px-4 text-left">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{step.label}</p>
      <h3 className={cn('text-xl font-semibold', isActive ? 'text-foreground' : 'text-muted-foreground')}>
        {step.title}
      </h3>
      <p className="text-sm text-muted-foreground">{step.description}</p>
      <p className="text-xs text-muted-foreground">
        {`${step.coordinate[0].toFixed(2)}°, ${step.coordinate[1].toFixed(2)}°`}
      </p>
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
    <VerticalTimeline
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
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { VerticalTimeline } from '@/components/prebuild/timeline/VerticalTimeline';
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
import type { MediaSide } from '../types';

function BarChartTimelineStep({ stepIndex, isActive }: TimelineStepRenderProps) {
  const step = CHART_TIMELINE_STEPS[stepIndex];
  if (!step) {
    return null;
  }

  return (
    <div className="space-y-2 px-4 text-left">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{step.label}</p>
      <h3 className={cn('text-xl font-semibold', isActive ? 'text-foreground' : 'text-muted-foreground')}>
        {step.title}
      </h3>
      <p className="text-sm text-muted-foreground">{step.description}</p>
      <p className="text-xs text-muted-foreground">{step.range}</p>
    </div>
  );
}

function BarChartTimelineMedia({ stepIndex }: TimelineMediaRenderProps) {
  const step = CHART_TIMELINE_STEPS[stepIndex] ?? CHART_TIMELINE_STEPS[0];
  const data = CHART_TIMELINE_DATASETS[stepIndex] ?? CHART_TIMELINE_DATASETS[0];

  return (
    <div className="flex h-full w-full flex-col gap-4 bg-muted/30 p-6">
      <div className="space-y-1">
        <p className="text-sm text-center font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          {step.label}
        </p>
        <p className="text-base text-center font-medium text-foreground">{step.range} activity</p>
      </div>
      <ChartContainer config={CHART_TIMELINE_CONFIG} className="h-full min-h-80 w-full">
        <BarChart data={data} margin={{ left: 12, right: 12 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="period" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="uv" fill="var(--color-uv)" radius={[4, 4, 0, 0]} maxBarSize={56} />
          <Bar dataKey="pv" fill="var(--color-pv)" radius={[4, 4, 0, 0]} maxBarSize={56} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

export default function BarChartVerticalTimelineDemo({ mediaSide = 'right' }: { mediaSide?: MediaSide }) {
  return (
    <VerticalTimeline
      steps={CHART_TIMELINE_STEPS.length}
      stepRatio={0.4}
      mediaMinHeight="60vh"
      mediaSide={mediaSide}
      getMediaKey={() => 'bar-chart'}
      StepComponent={BarChartTimelineStep}
      MediaComponent={BarChartTimelineMedia}
    />
  );
}
```