import { useCallback, useRef } from 'react';
import { Cell, Pie, PieChart, type PieProps } from 'recharts';

import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { DrillDown, type DrillDownApi } from '@/components/prebuild/data/DrillDown';

import { PIE_CONFIG, PIE_DATA, PIE_DATASETS } from './drilldown-data';

export function PieChartDrilldownDemo() {
  const apiRef = useRef<DrillDownApi | null>(null);
  const handleSliceClick = useCallback<NonNullable<PieProps['onClick']>>((data, _, event) => {
    event.preventDefault();
    const key = data?.payload?.key;
    if (key != null) {
      apiRef.current?.openDrilldown(String(key));
    }
  }, []);

  return (
    <div className="space-y-4 p-6">
      <ChartContainer config={PIE_CONFIG} className="min-h-80">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent nameKey="key" />} cursor={false} />
          <Pie
            data={PIE_DATA}
            dataKey="value"
            nameKey="key"
            onClick={handleSliceClick}
            className="hover:cursor-pointer"
          >
            {PIE_DATA.map((entry) => (
              <Cell key={entry.key} fill={`var(--color-${entry.key})`} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
      <DrillDown dataSets={PIE_DATASETS} apiRef={apiRef} />
    </div>
  );
}
