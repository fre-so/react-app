import type { ReactNode } from "react"

export type MediaSide = "left" | "right"

export type GalleryRenderProps = {
  mediaSide: MediaSide
  mapRouteProgress?: number
}

export type ControlOption = {
  label: string
  value: string
}

export type ControlConfig = {
  label: string
  options: readonly ControlOption[]
}

export type ControlConfigMap = Record<string, ControlConfig>

export type ComponentsGalleryNavItem<ControlId extends string = string> = {
  id: string
  title: string
  controls: ControlId[]
  section: {
    eyebrow: string
    description: string
    render: (props: GalleryRenderProps) => ReactNode
  }
}
