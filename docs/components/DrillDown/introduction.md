# DrillDown Component
Path: `components/prebuild/data/DrillDown.tsx`

## Visual Structure & Behavior

**Layout:**
- **Dialog**: The drill-down surface for inspecting detailed records behind Chart, Key Matrix, or other overview metrics
- **Dialog Header:** Title + optional description from the active dataset
- **Dialog Body:** One or more data tables rendered as tabs

**Interaction:**
- Open/close controlled via `apiRef` (`openDrilldown` / `close`)
- Dataset selection switches dialog title/description and available tables
- If multiple tables exist, tabs appear; single table renders directly
- Empty states show per-table `emptyText` or a default fallback

## When to Use

**Core principle: Use when a chart interaction needs a focused, structured detail view in a modal.**

Selection signals:
- ✅ Clicking a chart point/segment should reveal a detail table
- ✅ One interaction maps to multiple detail slices (tabs for UV/PV, etc.)
- ✅ Detail data is dense enough to justify a modal with scroll
- ✅ You want an API-driven drilldown, decoupled from the chart component
- ❌ Avoid: The detail view is simple enough for inline tooltips
- ❌ Avoid: The interaction should navigate to a new page instead of a modal

## Use Cases

1. **Weekly Metrics Drilldown** - Click a bar/line point to show UV/PV user lists per week
2. **Region Breakdown** - Click a pie slice to open order/account details for that region
3. **Radar Dimension Review** - Click a radar axis to inspect contributors per dimension
4. **Segment Comparison** - Swap tabs to compare multiple cohorts for the same selection
5. **KPI Exception Review** - Open a table of outliers or anomalies for a selected period
