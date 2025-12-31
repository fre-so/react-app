# Scrollytelling best practice

Scrollytelling is a presentation pattern that syncs narrative content with scroll-driven visual changes, using scrolling to trigger state shifts or animations that guide the reader. In presentations, it sets the pace, controls attention, and breaks complex information into staged highlights. Use it when the story benefits from linear reading, steps or phases have a clear order, and visuals strengthen comprehension (product flows, case studies, timelines).

## General guidelines

- Use `motion/react` for all scroll-driven interactions and animated state
  changes in this folder.
- Prefer `useScroll` + `useMotionValueEvent` for driving active state from
  scroll progress.
- Smooth scroll progress with `useSpring`, then feed it into `useTransform`
  or `style` bindings for opacity, position, and progress indicators.
- Use stacked `motion.div` layers for media swaps, toggling via opacity and
  directional offsets rather than mounting/unmounting.


### StickySideScrollytelling

Use cases
- Stories or explanations that benefit from generous vertical spacing per step.
- Situations where the layout does not need to be compact and can afford
  readable, full-height sections.
- A strong visual anchor (media) should stay in view while reading.

Data shape
```ts
type Step = {
  id: string
  kicker: string
  title: string
  body: string
  media: { title: string }
}
```

Props
- `steps?: Step[]` defaulted to `DEFAULT_STEPS`.
- `mediaSide?: "left" | "right"` controls column order on large screens.
- `scrollContainerRef?: RefObject<HTMLElement | null>` optional scroll container
  for non-window scrolling.

Layout design
- Two-column layout on large screens, stacked on small screens.
- Left column renders the step cards; right column holds a sticky media frame.
- The media frame uses an `aspect-4/5` container with a `min-h-90` fallback.
- Sticky media is centered vertically in the viewport by calculating `top` from
  `(viewportHeight - mediaHeight) / 2`.
- Each step card occupies `min-h-[60vh]` to create a full, readable scroll
  rhythm between state changes.

Interaction implementation
- Each card uses `useScroll` with `offset: ["start end", "end start"]`.
- `useSpring` smooths scroll progress.
- Opacity uses `useTransform` mapping `[0, 0.4, 0.6, 1] -> [0, 1, 1, 0]` for
  fade in and fade out as the card enters and exits.
- `useMotionValueEvent` triggers `onActive()` once progress is > 0.35, which
  updates the active index and swaps media.
- Media swap uses stacked `motion.div` elements, switching via opacity and
  vertical offset.
  - Active media uses `y: 0`.
  - When `index < activeIndex` (content already passed), `y: -24` to move up.
  - When `index > activeIndex` (content ahead), `y: 24` to move down.

Implementation notes
- A `ResizeObserver` (if available) recalculates sticky top on content resize.
- The sticky container is hidden until `stickyTop` is computed to avoid layout
  jumps.
- If `steps.length` is 0, the component returns `null`.

Code example: `/home/user/react-app/src/best-practice/scrollytelling/StickySide.tsx`

### HighlightStepScrollytelling

Use cases
- Compact, glanceable step list that stays visible while media swaps.
- Storytelling where the list itself is a navigation and status indicator.
- Good when each step is short but needs clear emphasis while scrolling.

Data shape
```ts
type Step = {
  id: string
  title: string
  description: string
}
```

Props
- `steps?: Step[]` defaulted to `DEFAULT_STEPS`.
- `mediaSide?: "left" | "right"` swaps order of list vs media on large screens.

Layout design
- A single section with a sticky content block centered in the viewport.
- Scroll space is created by `minHeight: calc(100vh + steps.length * 400px)`.
- Inside the sticky block, the list sits beside the media on large screens and
  stacks on small screens.
- Media area uses `aspect-4/3`, `min-h-80`, and a subtle border.

Interaction implementation
- The section uses `useScroll` with `offset: ["start start", "end end"]`.
- Active step index is derived from scroll progress:
  `floor(clampedProgress * steps.length)`.
- Each list item is a button that scrolls the page to the exact position for
  that step (no smooth animation, `behavior: "auto"`).
- Active list items get a left border accent and higher opacity; inactive items
  are dimmed and slightly offset on the x-axis.
- Media swaps use stacked `motion.div` layers with `opacity` and `y` offsets.
  - Active media uses `y: 0`.
  - When `index < activeIndex`, `y: -18` to slide up.
  - When `index > activeIndex`, `y: 18` to slide down.
- A progress bar at the bottom of the media panel uses `scaleX` bound to
  `smoothProgress`.

Implementation notes
- `ResizeObserver` centers the sticky block by setting `top` to
  `(viewportHeight - contentHeight) / 2`, but never less than 40.
- Active index is clamped on steps length changes.
- If `steps.length` is 0, the component returns `null`.

Code example: `/home/user/react-app/src/best-practice/scrollytelling/HighlightStep.tsx`

### TimelineScrollytelling

Use cases
- Chronological or milestone-driven stories.
- Choose horizontal orientation for compact, overview-style timelines.
- Choose vertical orientation for detailed narratives with tags and summaries.

Data shape
```ts
type TimelineStep = {
  id: string
  date: string
  title: string
  description: string
  tags?: string[]
  media: { title: string }
}
```

Props
- `steps?: TimelineStep[]` defaulted to `DEFAULT_STEPS`.
- `orientation?: "horizontal" | "vertical"` chooses layout mode.
- `mediaSide?: "left" | "right"` changes side of media in vertical layout.

Layout design (horizontal)
- A sticky block with the timeline on top and media below.
- Scroll space is created by `minHeight: calc(100vh + steps.length * 360px)`.
- The timeline line is an absolute horizontal bar with left/right insets so the
  line starts and ends at the center of the first/last dot.
  - `lineInset = 50 / steps.length` percent.
  - The line is rendered before the dots, so dots sit above it.
  - The line sits at `top = (dotHeight / 2 - 1)px`; with 12px dots this is
    `top-1.25` (5px) so the 2px line is centered under each dot.
  - A progress line is nested inside the base line and uses `scaleX` to show
    scroll progress.
- Each step item uses `flex-1` for equal width and has no margin/padding or
  inter-step gap, keeping the line inset math stable.
- Each dot is centered above a date and title; active dots use a ring accent.
- Media panel uses `min-h-88` and switches content via stacked layers.

Layout design (vertical)
- Two columns on large screens: timeline list on one side, sticky media on the
  other (respects `mediaSide`).
- Timeline line is a vertical rule with a progress `motion.div` fill that
  scales on y.
  - The line is absolutely positioned; dots are placed at the same x-center so
    the line passes through each dot center.
  - The line sits at `left = (dotWidth / 2 - 1)px` (half dot size minus half
    line thickness). In this layout the dot center is positioned at `left-4`
    with `-translate-x-1/2`, so the line uses `left-3.75` to stay 1px left of
    the dot center.
  - Dots are rendered after the line and use background color to cover the line
    underneath, keeping the dot edge crisp.
- Each list item occupies `min-h-[62vh]` for consistent step height and has no
  margin/padding or inter-step gap, making line positioning/inset calculations
  predictable.
- Cards use tags and background highlights when active.
- Media panel uses `aspect-4/5`, `min-h-96`, and a rounded border.

Interaction implementation
- Uses `useScroll` with `offset: ["start start", "end end"]` and spring
  smoothing for progress.
- Active index uses `floor(clampedProgress * (steps.length - 1))`.
- Timeline dots and cards update style based on active and passed states.
  - Normal: index > activeIndex (not reached yet).
  - Passed: index < activeIndex (already completed).
  - Active: index === activeIndex (current focus).
  - Horizontal dots:
    - Active: `border-primary bg-primary ring-4 ring-primary/20`.
    - Passed: `border-primary bg-primary`.
    - Normal: `border-muted-foreground/40 bg-background`.
    - Titles: active `text-foreground`, normal `text-muted-foreground` with
      `group-hover:text-foreground`.
  - Vertical dots:
    - Active: `border-primary bg-primary ring-4 ring-primary/20`.
    - Passed: `border-primary bg-primary`.
    - Normal: `border-muted-foreground/40 bg-background`.
    - Cards: active `bg-muted`, normal `group-hover:bg-muted`.
    - Titles: active `text-foreground`, normal `text-muted-foreground`.
- Clicking a dot or card scrolls the page to the computed step position.
- Media swapping mirrors the other components: stacked `motion.div` layers with
  opacity and y-offset transitions.
  - Vertical layout media uses `y: -24` when `index < activeIndex` and `y: 24`
    when `index > activeIndex`.
  - Horizontal layout media uses `y: -20` and `y: 20` for the same condition.

Implementation notes
- Sticky top is calculated from either the timeline block (horizontal) or media
  frame (vertical) and is centered in the viewport, with a min top of 40 for
  horizontal and 0 for vertical.
- `lineInset` is `50 / steps.length` percent, ensuring the progress line does
  not extend beyond the first and last dot.
- If `steps.length` is 0, the component returns `null`.

Code example: `/home/user/react-app/src/best-practice/scrollytelling/Timeline.tsx`
