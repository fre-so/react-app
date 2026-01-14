import { useCallback, useRef } from 'react';
import type { CartesianChartProps } from 'recharts/types/util/types';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { DrillDown, type DrillDownApi } from '@/components/prebuild/data/DrillDown';

import { RADAR_DATA, RADAR_DATASETS, UV_PV_CONFIG } from './drilldown-data';

export function RadarChartDrilldownDemo() {
  const apiRef = useRef<DrillDownApi | null>(null);

  const handleChartClick = useCallback<NonNullable<CartesianChartProps['onClick']>>((data, event) => {
    event.preventDefault();
    if (!data.isTooltipActive) return;
    const dimension = data.activeLabel;
    if (dimension == null) return;
    const seriesKey = typeof data.activeDataKey === 'string' ? data.activeDataKey : undefined;
    apiRef.current?.openDrilldown(String(dimension), seriesKey);
  }, []);

  return (
    <div className="space-y-4 p-6">
      <ChartContainer config={UV_PV_CONFIG} className="min-h-80">
        <RadarChart data={RADAR_DATA} onClick={handleChartClick}>
          <PolarGrid />
          <PolarAngleAxis dataKey="dimension" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Radar dataKey="uv" stroke="var(--color-uv)" fill="var(--color-uv)" fillOpacity={0.2} />
          <Radar dataKey="pv" stroke="var(--color-pv)" fill="var(--color-pv)" fillOpacity={0.2} />
        </RadarChart>
      </ChartContainer>
      <DrillDown dataSets={RADAR_DATASETS} apiRef={apiRef} />
    </div>
  );
}
