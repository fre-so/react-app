import type { DrillDownDataSet, DrillDownTable } from '@/components/prebuild/data/DrillDown';

type UserRow = {
  user: string;
  plan: string;
  lastActive: string;
};

type WeekDetail = {
  key: string;
  label: string;
  description: string;
  uvRows: UserRow[];
  pvRows: UserRow[];
};

type RadarDimensionDetail = {
  key: string;
  label: string;
  description: string;
  uvRows: UserRow[];
  pvRows: UserRow[];
};

const USER_COLUMNS = [
  { key: 'user', label: 'User' },
  { key: 'plan', label: 'Plan' },
  { key: 'lastActive', label: 'Last Active' },
];

const buildUserTables = (uvRows: UserRow[], pvRows: UserRow[]): DrillDownTable[] => [
  {
    key: 'uv',
    label: 'UV',
    columns: USER_COLUMNS,
    rows: uvRows,
    emptyText: 'No UV users.',
  },
  {
    key: 'pv',
    label: 'PV',
    columns: USER_COLUMNS,
    rows: pvRows,
    emptyText: 'No PV users.',
  },
];

const WEEK_DETAILS: WeekDetail[] = [
  {
    key: 'Week 1',
    label: 'Week 1',
    description: 'Week 1 UV/PV user details.',
    uvRows: [
      { user: 'Ava Chen', plan: 'Pro', lastActive: '2h' },
      { user: 'Leo Park', plan: 'Team', lastActive: '4h' },
      { user: 'Mia Patel', plan: 'Pro', lastActive: '1d' },
      { user: 'Noah Brooks', plan: 'Team', lastActive: '2d' },
      { user: 'Zoe Reed', plan: 'Starter', lastActive: '3d' },
      { user: 'Evan Fox', plan: 'Pro', lastActive: '4d' },
      { user: 'Lila Ortiz', plan: 'Team', lastActive: '5d' },
      { user: 'Owen Price', plan: 'Starter', lastActive: '6d' },
    ],
    pvRows: [
      { user: 'Iris Wang', plan: 'Starter', lastActive: '3h' },
      { user: 'Omar Silva', plan: 'Pro', lastActive: '6h' },
      { user: 'Priya Singh', plan: 'Team', lastActive: '1d' },
      { user: 'Theo Kim', plan: 'Starter', lastActive: '2d' },
      { user: 'Rina Cole', plan: 'Pro', lastActive: '3d' },
      { user: 'Miles Gray', plan: 'Team', lastActive: '4d' },
    ],
  },
  {
    key: 'Week 2',
    label: 'Week 2',
    description: 'Week 2 UV/PV user details.',
    uvRows: [
      { user: 'Callie Stone', plan: 'Team', lastActive: '1h' },
      { user: 'Ravi Shah', plan: 'Pro', lastActive: '5h' },
      { user: 'Jun Park', plan: 'Starter', lastActive: '1d' },
      { user: 'Sage Miller', plan: 'Team', lastActive: '2d' },
      { user: 'Eli Grant', plan: 'Pro', lastActive: '3d' },
      { user: 'Nina West', plan: 'Starter', lastActive: '4d' },
      { user: 'Tara Lane', plan: 'Team', lastActive: '5d' },
    ],
    pvRows: [
      { user: 'Kai Holt', plan: 'Starter', lastActive: '2h' },
      { user: 'Zara Cruz', plan: 'Pro', lastActive: '7h' },
      { user: 'Ivan Reed', plan: 'Team', lastActive: '1d' },
      { user: 'Maya Lowe', plan: 'Starter', lastActive: '2d' },
      { user: 'Cole Young', plan: 'Team', lastActive: '3d' },
    ],
  },
  {
    key: 'Week 3',
    label: 'Week 3',
    description: 'Week 3 UV/PV user details.',
    uvRows: [
      { user: 'Nico Blake', plan: 'Pro', lastActive: '1h' },
      { user: 'Sara Reed', plan: 'Team', lastActive: '3h' },
      { user: 'Drew Cole', plan: 'Starter', lastActive: '8h' },
      { user: 'Milo Kent', plan: 'Pro', lastActive: '1d' },
      { user: 'Jade Avery', plan: 'Team', lastActive: '2d' },
      { user: 'Luca Nash', plan: 'Starter', lastActive: '3d' },
      { user: 'Ari Lane', plan: 'Team', lastActive: '4d' },
      { user: 'Quinn Zane', plan: 'Pro', lastActive: '5d' },
      { user: 'Elle Frost', plan: 'Starter', lastActive: '6d' },
    ],
    pvRows: [
      { user: 'Ben Ward', plan: 'Starter', lastActive: '2h' },
      { user: 'Lia Cross', plan: 'Pro', lastActive: '5h' },
      { user: 'Odin Ray', plan: 'Team', lastActive: '1d' },
      { user: 'Faye Hart', plan: 'Starter', lastActive: '2d' },
      { user: 'Rhys Poe', plan: 'Pro', lastActive: '3d' },
      { user: 'Hope Lynn', plan: 'Team', lastActive: '4d' },
      { user: 'Ivy Snow', plan: 'Starter', lastActive: '5d' },
    ],
  },
];

export const WEEK_DATASETS: DrillDownDataSet[] = WEEK_DETAILS.map((week) => ({
  key: week.key,
  label: week.label,
  description: week.description,
  tables: buildUserTables(week.uvRows, week.pvRows),
}));

export const BAR_LINE_DATA = WEEK_DETAILS.map((week) => ({
  period: week.label,
  uv: week.uvRows.length,
  pv: week.pvRows.length,
}));

export const UV_PV_CONFIG = {
  uv: { label: 'UV', color: 'var(--chart-1)' },
  pv: { label: 'PV', color: 'var(--chart-2)' },
};

const PIE_COLUMNS = [
  { key: 'order', label: 'Order' },
  { key: 'account', label: 'Account' },
];

const PIE_SEGMENTS = [
  {
    key: 'north',
    label: 'North',
    description: 'North region order details.',
    rows: [
      { order: 'N-1024', account: 'Atelier' },
      { order: 'N-1029', account: 'Northwind' },
      { order: 'N-1035', account: 'Aster' },
      { order: 'N-1041', account: 'Nimble' },
      { order: 'N-1048', account: 'Nova' },
      { order: 'N-1053', account: 'Drift' },
    ],
  },
  {
    key: 'south',
    label: 'South',
    description: 'South region order details.',
    rows: [
      { order: 'S-889', account: 'Solstice' },
      { order: 'S-905', account: 'Terra' },
      { order: 'S-918', account: 'Arbor' },
      { order: 'S-940', account: 'Lumen' },
      { order: 'S-952', account: 'Vista' },
    ],
  },
  {
    key: 'east',
    label: 'East',
    description: 'East region order details.',
    rows: [
      { order: 'E-401', account: 'Kite' },
      { order: 'E-427', account: 'Vivid' },
      { order: 'E-438', account: 'Aria' },
      { order: 'E-452', account: 'Harbor' },
    ],
  },
  {
    key: 'west',
    label: 'West',
    description: 'West region order details.',
    rows: [
      { order: 'W-210', account: 'Quartz' },
      { order: 'W-218', account: 'Aurora' },
      { order: 'W-224', account: 'Crest' },
    ],
  },
];

export const PIE_DATASETS: DrillDownDataSet[] = PIE_SEGMENTS.map((segment) => ({
  key: segment.key,
  label: segment.label,
  description: segment.description,
  tables: [
    {
      key: 'orders',
      label: 'Orders',
      columns: PIE_COLUMNS,
      rows: segment.rows,
      emptyText: `No ${segment.label} orders.`,
    },
  ],
}));

export const PIE_DATA = PIE_SEGMENTS.map((segment) => ({
  key: segment.key,
  label: segment.label,
  value: segment.rows.length,
}));

export const PIE_CONFIG = PIE_SEGMENTS.reduce<Record<string, { label: string; color: string }>>(
  (acc, segment, index) => {
    acc[segment.key] = {
      label: segment.label,
      color: `var(--chart-${(index % 5) + 1})`,
    };
    return acc;
  },
  {}
);

const RADAR_DIMENSIONS: RadarDimensionDetail[] = [
  {
    key: 'Design',
    label: 'Design',
    description: 'Design dimension user details.',
    uvRows: [
      { user: 'Ava Chen', plan: 'Pro', lastActive: '2h' },
      { user: 'Leo Park', plan: 'Team', lastActive: '4h' },
      { user: 'Mia Patel', plan: 'Pro', lastActive: '1d' },
      { user: 'Noah Brooks', plan: 'Team', lastActive: '2d' },
      { user: 'Zoe Reed', plan: 'Starter', lastActive: '3d' },
      { user: 'Evan Fox', plan: 'Pro', lastActive: '4d' },
    ],
    pvRows: [
      { user: 'Iris Wang', plan: 'Starter', lastActive: '3h' },
      { user: 'Omar Silva', plan: 'Pro', lastActive: '6h' },
      { user: 'Priya Singh', plan: 'Team', lastActive: '1d' },
      { user: 'Theo Kim', plan: 'Starter', lastActive: '2d' },
    ],
  },
  {
    key: 'Velocity',
    label: 'Velocity',
    description: 'Velocity dimension user details.',
    uvRows: [
      { user: 'Callie Stone', plan: 'Team', lastActive: '1h' },
      { user: 'Ravi Shah', plan: 'Pro', lastActive: '5h' },
      { user: 'Jun Park', plan: 'Starter', lastActive: '1d' },
      { user: 'Sage Miller', plan: 'Team', lastActive: '2d' },
      { user: 'Eli Grant', plan: 'Pro', lastActive: '3d' },
    ],
    pvRows: [
      { user: 'Kai Holt', plan: 'Starter', lastActive: '2h' },
      { user: 'Zara Cruz', plan: 'Pro', lastActive: '7h' },
      { user: 'Ivan Reed', plan: 'Team', lastActive: '1d' },
    ],
  },
  {
    key: 'Quality',
    label: 'Quality',
    description: 'Quality dimension user details.',
    uvRows: [
      { user: 'Nico Blake', plan: 'Pro', lastActive: '1h' },
      { user: 'Sara Reed', plan: 'Team', lastActive: '3h' },
      { user: 'Drew Cole', plan: 'Starter', lastActive: '8h' },
      { user: 'Milo Kent', plan: 'Pro', lastActive: '1d' },
      { user: 'Jade Avery', plan: 'Team', lastActive: '2d' },
    ],
    pvRows: [
      { user: 'Ben Ward', plan: 'Starter', lastActive: '2h' },
      { user: 'Lia Cross', plan: 'Pro', lastActive: '5h' },
      { user: 'Odin Ray', plan: 'Team', lastActive: '1d' },
      { user: 'Faye Hart', plan: 'Starter', lastActive: '2d' },
    ],
  },
  {
    key: 'Support',
    label: 'Support',
    description: 'Support dimension user details.',
    uvRows: [
      { user: 'Luca Nash', plan: 'Starter', lastActive: '3d' },
      { user: 'Ari Lane', plan: 'Team', lastActive: '4d' },
      { user: 'Quinn Zane', plan: 'Pro', lastActive: '5d' },
      { user: 'Elle Frost', plan: 'Starter', lastActive: '6d' },
    ],
    pvRows: [
      { user: 'Rhys Poe', plan: 'Pro', lastActive: '3d' },
      { user: 'Hope Lynn', plan: 'Team', lastActive: '4d' },
      { user: 'Ivy Snow', plan: 'Starter', lastActive: '5d' },
    ],
  },
];

export const RADAR_DATASETS: DrillDownDataSet[] = RADAR_DIMENSIONS.map((dimension) => ({
  key: dimension.key,
  label: dimension.label,
  description: dimension.description,
  tables: buildUserTables(dimension.uvRows, dimension.pvRows),
}));

export const RADAR_DATA = RADAR_DIMENSIONS.map((dimension) => ({
  dimension: dimension.label,
  uv: dimension.uvRows.length,
  pv: dimension.pvRows.length,
}));
