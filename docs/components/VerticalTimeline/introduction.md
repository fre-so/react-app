# VerticalTimeline Component
Path: `components/prebuild/timeline/VerticalTimeline.tsx`

## Visual Structure & Behavior

**2-columns Layout:**
- **Timeline column:** Vertical timeline spine with connected nodes and progress line indicator
- **Media column:** Sticky media panel centered in viewport

**Interaction:**
- Nodes illuminate progressively as user scrolls past each milestone
- Sticky media updates to display content associated with active node
- Clicking any node triggers smooth scroll-jump to that position
- Progress line fills from top to bottom, tracking scroll depth
- Media can be any component, including interactive maps, charts, or dashboards

## When to Use

**Core principle: Use when a chronological narrative needs a visible progress spine plus a synchronized media panel.**

Selection signals:
- ✅ Clear sequence (dates, phases, stages) benefits from progress tracking
- ✅ Each step has distinct media states (image, chart, map, prototype)
- ✅ Sticky media should stay visible while steps scroll by
- ✅ You want to group multiple steps under one media state
- ✅ 4-8 milestones (beyond 8 starts to feel crowded)
- ❌ Avoid: No natural ordering or sequence
- ❌ Avoid: Content can be summarized in a single static panel

## Use Cases

1. **Route or Expansion Story** - City-by-city rollout with a map that pans to each location
2. **Performance Timeline** - Quarterly KPIs with charts that update per milestone
3. **Product Build History** - Concept → prototype → beta → launch with design/media changes
4. **Incident Response Review** - Detection → mitigation → recovery with dashboards per phase
5. **Campaign Lifecycle** - Plan → launch → optimize → results with creatives and metrics
6. **Research Journey** - Hypothesis → experiments → findings with supporting visuals
