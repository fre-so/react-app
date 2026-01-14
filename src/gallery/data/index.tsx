import type { ComponentsGalleryNavItem, ControlConfigMap } from "../types"

import { BarChartDrilldownDemo } from "./bar-chart-drilldown"
import { LineChartDrilldownDemo } from "./line-chart-drilldown"
import { PieChartDrilldownDemo } from "./pie-chart-drilldown"
import { RadarChartDrilldownDemo } from "./radar-chart-drilldown"

export const DATA_CONTROLS = {} as const satisfies ControlConfigMap

export type DataControlId = never

export const DATA_NAV_ITEMS = [
  {
    id: "drilldown-bar",
    title: "Drill Down - Bar",
    controls: [],
    section: {
      eyebrow: "Data",
      description: "Click a bar to open the selected week drill down.",
      render: () => <BarChartDrilldownDemo />,
    },
  },
  {
    id: "drilldown-line",
    title: "Drill Down - Line",
    controls: [],
    section: {
      eyebrow: "Data",
      description: "Line points open the matching week and series table.",
      render: () => <LineChartDrilldownDemo />,
    },
  },
  {
    id: "drilldown-pie",
    title: "Drill Down - Pie",
    controls: [],
    section: {
      eyebrow: "Data",
      description: "Slice clicks open the matching segment details.",
      render: () => <PieChartDrilldownDemo />,
    },
  },
  {
    id: "drilldown-radar",
    title: "Drill Down - Radar",
    controls: [],
    section: {
      eyebrow: "Data",
      description: "Radar clicks open the selected dimension details.",
      render: () => <RadarChartDrilldownDemo />,
    },
  },
] satisfies ComponentsGalleryNavItem<DataControlId>[]
