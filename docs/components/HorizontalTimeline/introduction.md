# HorizontalTimeline Component
Path: `components/prebuild/timeline/HorizontalTimeline.tsx`

## Visual Structure & Behavior

**Layout:**
- **Top strip:** Horizontal timeline bar with sequential nodes spanning viewport width
- **Bottom area:** Large media display panel synced to active node
- Sticky behavior keeps timeline strip + media combo in view

**Interaction:**
- Active node highlights with visual emphasis (scale/color change)
- Media area below updates instantly when new node becomes active
- Interactive media (e.g., Map, Chart) can be used and driven by scroll progress to update component state
- Click any node to jump directly to that section
- Horizontal scroll for compact timelines

## When to Use

**Core principle: Use when you need a compact, left-to-right overview with media synced to each step.**

Selection signals:
- ✅ Fewer steps (3-6, max 8) that should stay visible in one viewport
- ✅ A media panel (image/video/chart/map) that updates with steps, optionally driven by `scrollProgress`
- ✅ Multiple steps share a single media view (grouped via `getMediaKey`) to show continuous change
- ✅ Clickable nodes for quick jumps and a natural left-to-right narrative flow
- ❌ Avoid: Too many steps (>8) that crowd the strip or require long text blocks
- ❌ Avoid: Experiences that depend on deep vertical scrolling or heavy per-step interaction

## Use Cases

1. **Product Milestones** - Key phases paired with large visuals or short demos
2. **Route Storytelling** - A fixed map view that updates position and progress per step
3. **Data Narratives** - A single chart that highlights ranges or points across steps
4. **Process Overview** - 3-6 step workflows or journeys that benefit from at-a-glance clarity
5. **Before → During → After** - Smooth transitions across a shared media view
