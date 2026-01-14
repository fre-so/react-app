import { useCallback, useRef } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, type BarProps } from 'recharts';

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { DrillDown, type DrillDownApi } from '@/components/prebuild/data/DrillDown';

import { BAR_LINE_DATA, UV_PV_CONFIG, WEEK_DATASETS } from './drilldown-data';

export function BarChartDrilldownDemo() {
  const apiRef = useRef<DrillDownApi | null>(null);
  const handleUvClick = useCallback<NonNullable<BarProps['onClick']>>((data, _, event) => {
    event.preventDefault();
    const period = data.payload?.period;
    if (period != null) {
      apiRef.current?.openDrilldown(String(period), 'uv');
    }
  }, []);

  const handlePvClick = useCallback<NonNullable<BarProps['onClick']>>((data, _, event) => {
    event.preventDefault();
    const period = data.payload?.period;
    if (period != null) {
      apiRef.current?.openDrilldown(String(period), 'pv');
    }
  }, []);

  return (
    <div className="space-y-4 p-6">
      <ChartContainer config={UV_PV_CONFIG} className="min-h-80">
        <BarChart data={BAR_LINE_DATA} margin={{ left: 12, right: 12 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="period" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar
            dataKey="uv"
            fill="var(--color-uv)"
            radius={4}
            onClick={handleUvClick}
            maxBarSize={80}
            className="hover:cursor-pointer"
          />
          <Bar
            dataKey="pv"
            fill="var(--color-pv)"
            radius={4}
            onClick={handlePvClick}
            maxBarSize={80}
            className="hover:cursor-pointer"
          />
        </BarChart>
      </ChartContainer>
      <DrillDown dataSets={WEEK_DATASETS} apiRef={apiRef} />
    </div>
  );
}
