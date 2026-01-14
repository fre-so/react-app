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
