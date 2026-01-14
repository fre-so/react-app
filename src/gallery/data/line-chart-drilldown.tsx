import { useCallback, useRef } from 'react';
import type { CartesianChartProps } from 'recharts/types/util/types';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { DrillDown, type DrillDownApi } from '@/components/prebuild/data/DrillDown';

import { BAR_LINE_DATA, UV_PV_CONFIG, WEEK_DATASETS } from './drilldown-data';

export function LineChartDrilldownDemo() {
  const apiRef = useRef<DrillDownApi | null>(null);

  const handleChartClick = useCallback<NonNullable<CartesianChartProps['onClick']>>((data, event) => {
    event.preventDefault();
    if (!data.isTooltipActive) return;
    const period = data.activeLabel;
    if (period == null) return;
    const seriesKey = typeof data.activeDataKey === 'string' ? data.activeDataKey : undefined;
    apiRef.current?.openDrilldown(String(period), seriesKey);
  }, []);

  return (
    <div className="space-y-4 p-6">
      <ChartContainer config={UV_PV_CONFIG} className="min-h-80">
        <LineChart data={BAR_LINE_DATA} onClick={handleChartClick}>
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
      <DrillDown dataSets={WEEK_DATASETS} apiRef={apiRef} />
    </div>
  );
}
