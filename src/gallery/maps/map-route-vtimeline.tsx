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
