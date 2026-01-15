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
