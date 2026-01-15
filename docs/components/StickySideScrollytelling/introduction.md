# StickySideScrollytelling Component
Path: `components/prebuild/scrollytelling/StickySide.tsx`

## Visual Structure & Behavior

**2-columns Layout:**
- **Scrolling column:** Vertical sequence of content steps, each occupying 60-100vh (generous breathing room)
- **Sticky column:** Media panel fixed in viewport center, remains visible during scroll

**Interaction:**
- As user scrolls through steps, sticky media updates to match active step
- Step activation triggers at 33% ~ 66% viewport entry
- Media can be any component, including interactive maps, charts, or any custom components

## When to Use

**Core principle: Use when you need a persistent media panel that updates as a step-by-step narrative unfolds.**

Selection signals:
- ✅ Core visual element needs to remain visible throughout the narrative (chart/image/diagram)
- ✅ Visual content updates/switches in stages as text progresses
- ✅ Textual explanation is lengthy and needs multiple steps to unfold
- ✅ Visual and text are complementary (not simple repetition)
- ❌ Avoid: Visual content is completely static with no changes
- ❌ Avoid: Text and visual can be understood completely separately

## Use Cases

1. **Route-Based Story** - Step through a journey while a sticky map flies between locations or reveals waypoints
2. **Chart Walkthrough** - Explain KPIs in stages while a chart updates or highlights the active series
3. **Process Deep Dive** - Walk through a system pipeline with the media panel focusing on the current component
4. **Product Comparison** - Each step highlights a dimension, media shows side-by-side contrasts or heatmaps
5. **Operational Review** - Incident timeline with the media panel showing dashboards or logs per phase
6. **Problem → Solution** - Narrative moves from pain points to outcomes as the media switches from issues to fixes
