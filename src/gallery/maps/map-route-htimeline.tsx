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
