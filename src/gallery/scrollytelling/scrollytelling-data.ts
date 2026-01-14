export const HIGHLIGHT_STEPS = [
  {
    title: 'Define the question',
    description:
      'Anchor the narrative around the decision you want the reader to make. Keep the scope tight and explicit.',
    mediaTitle: 'Placeholder Media A',
  },
  {
    title: 'Surface the tension',
    description: 'Highlight what breaks today and why it matters. One or two sentences is enough to create momentum.',
    mediaTitle: 'Placeholder Media B',
  },
  {
    title: 'Contrast the options',
    description: 'Compare two approaches side by side, calling out the trade-offs in a single concise line.',
    mediaTitle: 'Placeholder Media C',
  },
  {
    title: 'Commit to the shift',
    description: 'Close with the next step and the impact. Make the transition feel deliberate, not abrupt.',
    mediaTitle: 'Placeholder Media D',
  },
];

export const STICKY_SIDE_STEPS = [
  {
    kicker: 'Step 01',
    title: 'Signal Discovery',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed urna in nisi posuere consequat. Ut blandit neque vitae justo vulputate. Integer varius sapien vitae odio fringilla, sed commodo erat interdum. Mauris accumsan velit ut nibh cursus, ac aliquam lacus pulvinar. Curabitur gravida nunc at ligula fermentum, a aliquet justo malesuada.',
    mediaTitle: 'Placeholder Media A',
  },
  {
    kicker: 'Step 02',
    title: 'Pattern Alignment',
    body: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Eu tincidunt tortor aliquam nulla facilisi cras fermentum odio. Egestas maecenas pharetra convallis posuere morbi leo urna molestie at. Quisque vel lacus faucibus, posuere libero in, congue lectus. Maecenas sed cursus nunc, vitae pellentesque est.',
    mediaTitle: 'Placeholder Media B',
  },
  {
    kicker: 'Step 03',
    title: 'Prototype Drift',
    body: 'Quis ipsum suspendisse ultrices gravida. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Semper feugiat nibh sed pulvinar proin gravida hendrerit lectus. Ultricies mi eget mauris pharetra et ultrices neque ornare aenean. Integer at neque non quam cursus faucibus in in quam. Duis volutpat velit sit amet mi efficitur, nec commodo nunc sodales.',
    mediaTitle: 'Placeholder Media C',
  },
  {
    kicker: 'Step 04',
    title: 'Scale Rehearsal',
    body: 'Nisl nunc mi ipsum faucibus vitae aliquet nec. Amet facilisis magna etiam tempor orci eu lobortis elementum. Consequat mauris nunc congue nisi vitae suscipit tellus mauris a. Enim eu turpis egestas pretium aenean pharetra magna ac. Nulla facilisi morbi tempus iaculis urna id volutpat. Fusce aliquet sem vel orci hendrerit, non mattis lectus tempor.',
    mediaTitle: 'Placeholder Media D',
  },
  {
    kicker: 'Step 05',
    title: 'Launch Narrative',
    body: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Magna etiam tempor orci eu. Aliquam vestibulum morbi blandit cursus risus at ultrices mi tempus. Risus ultricies tristique nulla aliquet enim tortor at auctor. Cras fermentum odio eu feugiat pretium nibh ipsum consequat. Sed sed viverra ipsum nunc aliquet bibendum enim facilisis.',
    mediaTitle: 'Placeholder Media E',
  },
];

type MapStickyStep = {
  kicker: string;
  title: string;
  body: string;
  location: string;
  coordinate: [number, number];
  zoom: number;
};

export const MAP_STICKY_STEPS: MapStickyStep[] = [
  {
    kicker: 'Step 01',
    title: 'West Coast ignition',
    body: 'Start the story where early adopters cluster and signals travel quickly between teams.',
    location: 'San Francisco',
    coordinate: [-122.4194, 37.7749],
    zoom: 5,
  },
  {
    kicker: 'Step 02',
    title: 'East Coast handoff',
    body: 'Shift attention to the northeast corridor as enterprise demand ramps up.',
    location: 'New York City',
    coordinate: [-74.006, 40.7128],
    zoom: 5,
  },
  {
    kicker: 'Step 03',
    title: 'Europe pulse',
    body: 'Highlight the central hub where Midwest demand starts to stack.',
    location: 'Chicago',
    coordinate: [-87.6298, 41.8781],
    zoom: 5,
  },
  {
    kicker: 'Step 04',
    title: 'APAC surge',
    body: 'Zoom into the fastest growing market and measure the lift in engagement.',
    location: 'Austin',
    coordinate: [-97.7431, 30.2672],
    zoom: 5,
  },
  {
    kicker: 'Step 05',
    title: 'Southern capstone',
    body: 'Wrap the narrative with the southern region as momentum stabilizes.',
    location: 'Miami',
    coordinate: [-80.1918, 25.7617],
    zoom: 5,
  },
];

export const RADAR_STICKY_STEPS = [
  {
    kicker: 'Phase 01',
    title: 'Baseline footprint',
    body: 'Measure the initial profile before any regional optimizations land.',
    label: 'Q1 baseline',
  },
  {
    kicker: 'Phase 02',
    title: 'Lifted engagement',
    body: 'Capture the early improvements as new workflows tighten.',
    label: 'Q2 lift',
  },
  {
    kicker: 'Phase 03',
    title: 'Expansion push',
    body: 'Show the multi-channel expansion and the resulting balance shifts.',
    label: 'Q3 expansion',
  },
  {
    kicker: 'Phase 04',
    title: 'Peak efficiency',
    body: 'End with the most efficient distribution after tuning.',
    label: 'Q4 peak',
  },
];

const RADAR_DIMENSIONS = ['Reach', 'Activation', 'Retention', 'Revenue', 'Referral'];

const RADAR_STICKY_VALUES = [
  {
    uv: [40, 25, 35, 18, 22],
    pv: [55, 35, 48, 26, 30],
  },
  {
    uv: [70, 85, 60, 72, 55],
    pv: [92, 110, 78, 95, 70],
  },
  {
    uv: [55, 65, 95, 48, 88],
    pv: [72, 84, 125, 66, 112],
  },
  {
    uv: [95, 78, 110, 92, 100],
    pv: [130, 108, 150, 128, 135],
  },
];

export const RADAR_STICKY_DATASETS = RADAR_STICKY_VALUES.map((series) =>
  RADAR_DIMENSIONS.map((dimension, index) => ({
    dimension,
    uv: series.uv[index],
    pv: series.pv[index],
  }))
);

export const RADAR_STICKY_CONFIG = {
  uv: { label: 'UV', color: 'var(--chart-1)' },
  pv: { label: 'PV', color: 'var(--chart-2)' },
};
