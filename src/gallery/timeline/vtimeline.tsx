import { VerticalTimeline } from '@/components/prebuild/timeline/VerticalTimeline';
import type { TimelineMediaRenderProps, TimelineStepRenderProps } from '@/components/prebuild/timeline/utils';
import { cn } from '@/lib/utils';

import { TIMELINE_STEPS } from './timeline-data';

function VerticalTimelineStepCard({ stepIndex, isActive }: TimelineStepRenderProps) {
  const step = TIMELINE_STEPS[stepIndex];

  if (!step) return null;

  return (
    <div className="space-y-2 text-left px-4">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{step.date}</p>
      <h3 className={cn('text-xl font-semibold', isActive ? 'text-foreground' : 'text-muted-foreground')}>
        {step.title}
      </h3>
      <p className="text-sm text-muted-foreground">{step.description}</p>
    </div>
  );
}

function TimelineMediaPanel({ stepIndex }: TimelineMediaRenderProps) {
  const step = TIMELINE_STEPS[stepIndex];

  if (!step) return null;

  return (
    <div className="flex h-full items-center justify-center bg-muted">
      <span className="text-3xl font-semibold text-foreground">{step.mediaTitle}</span>
    </div>
  );
}

export function VerticalTimelineSection({ mediaSide }: { mediaSide: 'left' | 'right' }) {
  return (
    <VerticalTimeline
      steps={TIMELINE_STEPS.length}
      mediaSide={mediaSide}
      StepComponent={VerticalTimelineStepCard}
      MediaComponent={TimelineMediaPanel}
    />
  );
}
