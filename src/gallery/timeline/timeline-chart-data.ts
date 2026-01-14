export type ChartTimelineStep = {
  label: string;
  title: string;
  description: string;
  range: string;
};

type ChartTimelineDatum = {
  period: string;
  uv: number;
  pv: number;
};

export const CHART_TIMELINE_STEPS: ChartTimelineStep[] = [
  {
    label: '2024 Q1',
    title: 'Activation lift',
    description: 'Early activation improvements raised weekly engagement.',
    range: 'Jan-Mar',
  },
  {
    label: '2024 Q2',
    title: 'Retention build',
    description: 'Lifecycle nudges stabilized cohorts as volume grew.',
    range: 'Apr-Jun',
  },
  {
    label: '2024 Q3',
    title: 'Expansion shift',
    description: 'Regional rollouts nudged longer sessions upward.',
    range: 'Jul-Sep',
  },
  {
    label: '2024 Q4',
    title: 'Peak season',
    description: 'Campaign bursts lifted the late-year mix.',
    range: 'Oct-Dec',
  },
];

export const CHART_TIMELINE_DATASETS: ChartTimelineDatum[][] = [
  [
    { period: 'Jan', uv: 85, pv: 180 },
    { period: 'Feb', uv: 140, pv: 230 },
    { period: 'Mar', uv: 210, pv: 310 },
  ],
  [
    { period: 'Apr', uv: 110, pv: 260 },
    { period: 'May', uv: 190, pv: 320 },
    { period: 'Jun', uv: 260, pv: 410 },
  ],
  [
    { period: 'Jul', uv: 130, pv: 300 },
    { period: 'Aug', uv: 210, pv: 380 },
    { period: 'Sep', uv: 295, pv: 480 },
  ],
  [
    { period: 'Oct', uv: 170, pv: 360 },
    { period: 'Nov', uv: 260, pv: 470 },
    { period: 'Dec', uv: 340, pv: 620 },
  ],
];

export const CHART_TIMELINE_CONFIG = {
  uv: { label: 'UV', color: 'var(--chart-1)' },
  pv: { label: 'PV', color: 'var(--chart-2)' },
};
