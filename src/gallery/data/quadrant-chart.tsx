import { Scatter } from 'recharts';

import { QuadrantChart } from '@/components/prebuild/data/QuadrantChart';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const QUADRANT_CONFIG = {
  core: {
    label: 'Core',
    color: 'hsl(199 79% 48%)',
  },
  edge: {
    label: 'Edge',
    color: 'hsl(41 92% 58%)',
  },
};

const CORE_DATA = [
  { name: 'Automation', importance: 86, urgency: 74 },
  { name: 'Performance', importance: 78, urgency: 63 },
  { name: 'Observability', importance: 69, urgency: 58 },
  { name: 'Reliability', importance: 74, urgency: 82 },
];

const EDGE_DATA = [
  { name: 'Docs', importance: 36, urgency: 22 },
  { name: 'Visual Tweaks', importance: 28, urgency: 35 },
  { name: 'Motion', importance: 42, urgency: 31 },
  { name: 'Experiments', importance: 52, urgency: 18 },
];

export function QuadrantChartDemo() {
  return (
    <ChartContainer config={QUADRANT_CONFIG} className="min-h-80">
      <QuadrantChart
        xAxis={{ dataKey: 'importance', domain: [0, 100], startLabel: 'Low', endLabel: 'High', label: 'Importance' }}
        yAxis={{ dataKey: 'urgency', domain: [0, 100], startLabel: 'Low', endLabel: 'High', label: 'Urgency' }}
      >
        <ChartTooltip content={<ChartTooltipContent />} />
        <Scatter name="core" data={CORE_DATA} fill="var(--color-core)" />
        <Scatter name="edge" data={EDGE_DATA} fill="var(--color-edge)" />
      </QuadrantChart>
    </ChartContainer>
  );
}
