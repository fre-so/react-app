# StickySideScrollytelling Component
Path: `components/prebuild/scrollytelling/StickySide.tsx`

## Visual Structure & Behavior

**2-columns Layout:**
- **Scrolling column:** Vertical sequence of content steps, each occupying 60-100vh (generous breathing room)
- **Sticky column:** Media panel fixed in viewport center, remains visible during scroll

**Interaction:**
- As user scrolls through steps, sticky media updates to match active step
- Step activation triggers at 33% ~ 66% viewport entry
- Media can be any component, including interactive maps, charts, or data visualizations

## When to Use

**Core principle: Use when you need a persistent media panel that updates as a step-by-step narrative unfolds.**

Selection signals:
- ✅ Media should stay fixed while the story advances through discrete steps
- ✅ Media is interactive (map/chart/dashboard) or needs to animate with scroll progress
- ✅ Step-by-step narration benefits from synchronized visuals rather than standalone sections
- ✅ You want to group multiple steps under one media state (via media grouping)
- ❌ Avoid: No relationship between the steps and the visual state
- ❌ Avoid: All content can be consumed as a single static panel

## Use Cases

1. **Route-Based Story** - Step through a journey while a sticky map flies between locations or reveals waypoints
2. **Chart Walkthrough** - Explain KPIs in stages while a chart updates or highlights the active series
3. **Process Deep Dive** - Walk through a system pipeline with the media panel focusing on the current component
4. **Product Comparison** - Each step highlights a dimension, media shows side-by-side contrasts or heatmaps
5. **Operational Review** - Incident timeline with the media panel showing dashboards or logs per phase
6. **Problem → Solution** - Narrative moves from pain points to outcomes as the media switches from issues to fixes
