import {
  StickySideScrollytelling,
  type StickySideMediaRenderProps,
  type StickySideStepRenderProps,
} from '@/components/prebuild/scrollytelling/StickySide';

import { cn } from '@/lib/utils';

import type { MediaSide } from '../types';

import { STICKY_SIDE_STEPS } from './scrollytelling-data';

function StickySideStepCard({ stepIndex, isActive }: StickySideStepRenderProps) {
  const step = STICKY_SIDE_STEPS[stepIndex];

  return (
    <div className={cn('w-full rounded-lg border border-border/60 p-4 transition-colors', isActive && 'border-border')}>
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{step.kicker}</p>
      <h3 className="mt-2 text-2xl font-semibold text-foreground">{step.title}</h3>
      <p className="mt-2 text-base text-muted-foreground">{step.body}</p>
    </div>
  );
}

function StickySideMedia({ stepIndex }: StickySideMediaRenderProps) {
  const step = STICKY_SIDE_STEPS[stepIndex];

  return (
    <div className="flex h-full items-center justify-center bg-muted">
      <span className="text-3xl font-semibold text-foreground">{step.mediaTitle}</span>
    </div>
  );
}

type StickySideSectionProps = {
  mediaSide: MediaSide;
};

export function StickySideSection({ mediaSide }: StickySideSectionProps) {
  return (
    <StickySideScrollytelling
      mediaSide={mediaSide}
      steps={STICKY_SIDE_STEPS.length}
      StepComponent={StickySideStepCard}
      MediaComponent={StickySideMedia}
    />
  );
}
