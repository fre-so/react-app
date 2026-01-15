# MapRoute Component
Path: `components/prebuild/maps/MapRoute.tsx`

## Visual Structure & Behavior

**Layout:**
- Full-viewport Mapbox map with route line connecting waypoints
- Markers positioned at key locations along the route
- Route calculated via Mapbox Directions API (driving mode)

**Interaction:**
- Displays complete route with all waypoints and markers
- Map auto-fits bounds to show entire route on load
- Standard map controls: zoom, pan, rotate

## When to Use

**Core principle: Use when you need to display a complete geographical route as a standalone map visualization.**

Selection signals:
- ✅ Show full journey path between multiple locations at once
- ✅ Spatial relationships and distances are important to understand
- ✅ Route serves as reference or context within larger content
- ✅ MapRoute needs to pair with scrollytelling or timeline components for narrative context
- ❌ Avoid: Need step-by-step narrative for each location (use MapTimeline)
- ❌ Avoid: Map should be the primary scrolling storytelling element

**Works well with other components:**
- StickySide for scrollytelling layouts with a fixed map and narrative panels
- VerticalTimeline to align route progress with a chronological list of events
- HorizontalTimeline to pair the route with a compact, horizontal sequence

## Use Cases

1. **Logistics Overview** - Display complete supply chain route from origin to destination
2. **Project Site Map** - Show all locations involved in multi-site project for reference
3. **Portfolio Geography** - Visualize fund's asset distribution across regions
4. **Field Operations Planning** - Present planned inspection route across facilities
5. **Transportation Network** - Illustrate distribution routes or delivery coverage areas
6. **Report Documentation** - Static route maps embedded in presentations or reports
