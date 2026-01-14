import type { ComponentsGalleryNavItem, ControlConfigMap } from "../types"

import BarChartVerticalTimelineDemo from "./bar-chart-vtimeline"
import { HorizontalTimelineSection } from "./htimeline"
import LineChartHorizontalTimelineDemo from "./line-chart-htimeline"
import { VerticalTimelineSection } from "./vtimeline"

export const TIMELINE_CONTROLS = {
  mediaSide: {
    label: "Media side",
    options: [
      { label: "Left", value: "left" },
      { label: "Right", value: "right" },
    ],
  },
} as const satisfies ControlConfigMap

export type TimelineControlId = keyof typeof TIMELINE_CONTROLS

const VERTICAL_TIMELINE_NAV_ITEM = {
  id: "timeline-vertical",
  title: "Vertical Timeline",
  controls: ["mediaSide"],
  section: {
    eyebrow: "Scrollytelling",
    description: "Keep the steps detailed while the media stays pinned.",
    render: ({ mediaSide }) => (
      <VerticalTimelineSection mediaSide={mediaSide} />
    ),
  },
} satisfies ComponentsGalleryNavItem<TimelineControlId>

const HORIZONTAL_TIMELINE_NAV_ITEM = {
  id: "timeline-horizontal",
  title: "Horizontal Timeline",
  controls: [],
  section: {
    eyebrow: "Scrollytelling",
    description: "Scan a lightweight timeline with media below.",
    render: () => <HorizontalTimelineSection />,
  },
} satisfies ComponentsGalleryNavItem<TimelineControlId>

const BAR_CHART_VERTICAL_TIMELINE_NAV_ITEM = {
  id: "timeline-vertical-bar-chart",
  title: "Vertical Timeline Bar Chart",
  controls: ["mediaSide"],
  section: {
    eyebrow: "Analytics",
    description: "Scroll through quarters while the bar chart updates in place.",
    render: ({ mediaSide }) => <BarChartVerticalTimelineDemo mediaSide={mediaSide} />,
  },
} satisfies ComponentsGalleryNavItem<TimelineControlId>

const LINE_CHART_HORIZONTAL_TIMELINE_NAV_ITEM = {
  id: "timeline-horizontal-line-chart",
  title: "Horizontal Timeline Line Chart",
  controls: [],
  section: {
    eyebrow: "Analytics",
    description: "Track the timeline as the line chart shifts by period.",
    render: () => <LineChartHorizontalTimelineDemo />,
  },
} satisfies ComponentsGalleryNavItem<TimelineControlId>

export const TIMELINE_NAV_ITEMS = [
  VERTICAL_TIMELINE_NAV_ITEM,
  HORIZONTAL_TIMELINE_NAV_ITEM,
  BAR_CHART_VERTICAL_TIMELINE_NAV_ITEM,
  LINE_CHART_HORIZONTAL_TIMELINE_NAV_ITEM,
] satisfies ComponentsGalleryNavItem<TimelineControlId>[]
