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

**Core principle: Use when timeline needs to be compact/overview-focused, or when horizontal space better serves the narrative flow.**

Selection signals:
- ✅ Fewer steps (3-8) that benefit from simultaneous visibility
- ✅ Content needs "at-a-glance" overview before diving deep
- ✅ Screen real estate is constrained vertically
- ✅ Natural left-to-right progression matches reading pattern
- ❌ Avoid: Too many steps (>8) that cause horizontal crowding
- ❌ Avoid: Deep textual content per step (vertical scrolling awkward)

## Use Cases

1. **Product Milestones** - Key phases paired with large visuals or short demos
2. **Route Storytelling** - A fixed map view that updates position and progress per step
3. **Data Narratives** - A single chart that highlights ranges or points across steps
4. **Process Overview** - 3-8 step workflows or journeys that benefit from at-a-glance clarity
5. **Before → During → After** - Smooth transitions across a shared media view
