### DrillDown Component Usage

### Props
- `dataSets: DrillDownDataSet[]`: required dataset list. Each dataset maps to a dialog state.
- `apiRef?: MutableRefObject<DrillDownApi | null>`: exposes `openDrilldown` / `close` for external triggers (charts, tables, etc.).
- `className?: string`: dialog content wrapper class.

### Data Model
Use datasets to describe the dialog header and the tables shown in the body.

```ts
type DrillDownColumn = {
  key: string
  label: ReactNode
  align?: "left" | "center" | "right"
  className?: string
}

type DrillDownTable = {
  key: string
  label: ReactNode
  columns: DrillDownColumn[]
  rows: Array<Record<string, ReactNode>>
  emptyText?: ReactNode
}

type DrillDownDataSet = {
  key: string
  label: ReactNode
  description?: ReactNode
  tables: DrillDownTable[]
}
```

- `rows` should align with `columns` by key; missing values render as `"-"`.
- If `columns` or `rows` are empty, `emptyText` is shown (fallback: `"No drill down data."`).
- Multiple tables show tab navigation; a single table renders directly.

### DrillDownApi (apiRef)
Provide a ref so charts or overview widgets can open the dialog on interaction.

```ts
type DrillDownApi = {
  openDrilldown: (dataSetKey: string, tableKey?: string) => void
  close: () => void
}
```

- `dataSetKey` selects the dataset (title/description + tables).
- `tableKey` optionally selects a specific table; defaults to the first table.

### Examples

- Drill down from a BarChart:
```tsx
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
```

- Drill down from a LineChart:
```tsx
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
```

- Drill down from a PieChart:
```tsx
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
```

- Drill down from a RadarChart:
```tsx
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
```