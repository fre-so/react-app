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
