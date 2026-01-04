import { useEffect, useMemo, useRef, useState, type ReactElement } from "react"
import Map, {
  Layer,
  Marker,
  Source,
  type LngLatBoundsLike,
  type MapRef,
} from "react-map-gl/mapbox"
import type { FeatureCollection, LineString } from "geojson"
import { MapPin, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import "mapbox-gl/dist/mapbox-gl.css"

type LngLat = [number, number]

export type Coordinate = [number, number]

type ParsedCoordinates = {
  points: LngLat[]
  serialized: string
  error: string | null
}

type MarkerIcon = LucideIcon | ReactElement

type MarkerConfig = {
  icon?: MarkerIcon
}

type DirectionsResponse = {
  routes: Array<{
    geometry: LineString
  }>
  message?: string
}

type MapRouteProps = {
  coordinates: ReadonlyArray<Coordinate>
  markers?: ReadonlyArray<MarkerConfig>
  className?: string
}

const normalizeCoordinates = (
  coordinates: ReadonlyArray<Coordinate>
): ParsedCoordinates => {
  if (coordinates.length < 2 || coordinates.length > 25) {
    return {
      points: [],
      serialized: "",
      error: "Provide between two and 25 coordinate pairs.",
    }
  }

  const points: LngLat[] = []
  for (const coordinate of coordinates) {
    if (!Array.isArray(coordinate) || coordinate.length !== 2) {
      return {
        points: [],
        serialized: "",
        error: "Each coordinate must be [longitude, latitude].",
      }
    }

    const [lngValue, latValue] = coordinate
    const lng = Number(lngValue)
    const lat = Number(latValue)
    if (!Number.isFinite(lng) || !Number.isFinite(lat)) {
      return {
        points: [],
        serialized: "",
        error: "Longitude and latitude must be valid numbers.",
      }
    }
    if (lng < -180 || lng > 180 || lat < -90 || lat > 90) {
      return {
        points: [],
        serialized: "",
        error: "Longitude or latitude is out of range.",
      }
    }

    points.push([lng, lat])
  }

  return {
    points,
    serialized: points.map(([lng, lat]) => `${lng},${lat}`).join(";"),
    error: null,
  }
}

const buildFeatureCollection = (
  geometry: LineString
): FeatureCollection<LineString> => ({
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry,
    },
  ],
})

const getRouteMeta = (coordinates: LngLat[]) => {
  if (coordinates.length === 0) {
    return null
  }

  let minLng = coordinates[0][0]
  let maxLng = coordinates[0][0]
  let minLat = coordinates[0][1]
  let maxLat = coordinates[0][1]

  for (const [lng, lat] of coordinates) {
    minLng = Math.min(minLng, lng)
    maxLng = Math.max(maxLng, lng)
    minLat = Math.min(minLat, lat)
    maxLat = Math.max(maxLat, lat)
  }

  const bounds: LngLatBoundsLike = [
    [minLng, minLat],
    [maxLng, maxLat],
  ]

  return {
    bounds,
    center: {
      longitude: (minLng + maxLng) / 2,
      latitude: (minLat + maxLat) / 2,
    },
  }
}

const renderMarkerIcon = (icon?: MarkerIcon) => {
  if (!icon) {
    return <MapPin className="h-4 w-4" aria-hidden />
  }

  if (typeof icon === "function") {
    const Icon = icon
    return <Icon className="h-4 w-4" aria-hidden />
  }

  return icon
}

export default function MapRoute({
  coordinates,
  markers,
  className,
}: MapRouteProps) {
  const mapboxToken = import.meta.env.MAPBOX_API_TOKEN as string | undefined
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<MapRef | null>(null)
  const [isMapReady, setIsMapReady] = useState(false)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const [routeData, setRouteData] =
    useState<FeatureCollection<LineString> | null>(null)
  const [routeError, setRouteError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const parsedCoordinates = useMemo(
    () => normalizeCoordinates(coordinates),
    [coordinates]
  )

  const routeCoordinates = useMemo(() => {
    if (routeData?.features?.[0]?.geometry?.coordinates?.length) {
      return routeData.features[0].geometry.coordinates.map((point) => [
        point[0],
        point[1],
      ]) as LngLat[]
    }
    return parsedCoordinates.points
  }, [parsedCoordinates.points, routeData])

  const routeMeta = useMemo(() => {
    return getRouteMeta(routeCoordinates)
  }, [routeCoordinates])

  const resolvedMarkers = useMemo(() => {
    return parsedCoordinates.points.map((point, index) => {
      const config = markers?.[index]
      const icon = config?.icon
      const usesDefault = !icon

      return {
        point,
        icon,
        usesDefault,
      }
    })
  }, [markers, parsedCoordinates.points])

  useEffect(() => {
    if (!mapboxToken || parsedCoordinates.error) {
      setRouteData(null)
      setRouteError(null)
      setIsLoading(false)
      return
    }
    if (parsedCoordinates.points.length < 2) {
      setRouteData(null)
      setRouteError("Provide at least two coordinates.")
      setIsLoading(false)
      return
    }

    const controller = new AbortController()
    const fetchRoute = async () => {
      setIsLoading(true)
      setRouteError(null)
      setRouteData(null)

      try {
        const url = new URL(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${parsedCoordinates.serialized}`
        )
        url.searchParams.set("geometries", "geojson")
        url.searchParams.set("overview", "full")
        url.searchParams.set("steps", "false")
        url.searchParams.set("access_token", mapboxToken)

        const response = await fetch(url.toString(), {
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error(`Directions API error: ${response.status}`)
        }
        const data = (await response.json()) as DirectionsResponse
        const geometry = data.routes?.[0]?.geometry
        if (!geometry?.coordinates?.length) {
          throw new Error(data.message || "No route data returned.")
        }

        setRouteData(buildFeatureCollection(geometry))
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return
        }
        const message =
          error instanceof Error
            ? error.message
            : "Failed to load directions."
        setRouteError(message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRoute()
    return () => controller.abort()
  }, [
    mapboxToken,
    parsedCoordinates.error,
    parsedCoordinates.points.length,
    parsedCoordinates.serialized,
  ])

  useEffect(() => {
    const node = containerRef.current
    if (!node) {
      return
    }
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) {
        return
      }
      const { width, height } = entry.contentRect
      setContainerSize((prev) => {
        const nextWidth = Math.round(width)
        const nextHeight = Math.round(height)
        if (prev.width === nextWidth && prev.height === nextHeight) {
          return prev
        }
        return { width: nextWidth, height: nextHeight }
      })
    })

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isMapReady || !mapRef.current || !routeMeta) {
      return
    }
    if (containerSize.width === 0 || containerSize.height === 0) {
      return
    }
    const padding = {
      top: Math.round(containerSize.height * 0.1),
      bottom: Math.round(containerSize.height * 0.1),
      left: Math.round(containerSize.width * 0.1),
      right: Math.round(containerSize.width * 0.1),
    }
    mapRef.current.fitBounds(routeMeta.bounds, {
      padding,
      duration: 800,
      maxZoom: 6,
    })
  }, [
    containerSize.height,
    containerSize.width,
    isMapReady,
    routeMeta,
  ])

  if (!mapboxToken) {
    return (
      <div
        className={cn(
          "flex h-130 w-full items-center justify-center rounded-lg border border-dashed border-border bg-muted/40 text-sm text-muted-foreground",
          className
        )}
      >
        Missing MAPBOX_API_TOKEN in .env
      </div>
    )
  }

  if (parsedCoordinates.error) {
    return (
      <div
        className={cn(
          "flex h-130 w-full items-center justify-center rounded-lg border border-dashed border-border bg-muted/40 text-sm text-muted-foreground",
          className
        )}
      >
        {parsedCoordinates.error}
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-130 w-full overflow-hidden rounded-lg border border-border",
        className
      )}
    >
      <Map
        ref={mapRef}
        mapboxAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        initialViewState={{
          longitude: routeMeta?.center?.longitude ?? 0,
          latitude: routeMeta?.center?.latitude ?? 0,
          zoom: routeMeta ? 4 : 1,
        }}
        onLoad={() => setIsMapReady(true)}
        scrollZoom={false}
        reuseMaps
        style={{ width: "100%", height: "100%" }}
      >
        {routeData ? (
          <Source id="route" type="geojson" data={routeData}>
            <Layer
              id="route-outline"
              type="line"
              paint={{
                "line-color": "#f8fafc",
                "line-width": 8,
                "line-opacity": 0.9,
              }}
            />
            <Layer
              id="route-line"
              type="line"
              paint={{
                "line-color": "#0f172a",
                "line-width": 4,
                "line-opacity": 0.9,
              }}
            />
          </Source>
        ) : null}

        {resolvedMarkers.map((marker, index) => (
          <Marker
            key={`${marker.point[0]}-${marker.point[1]}-${index}`}
            longitude={marker.point[0]}
            latitude={marker.point[1]}
            anchor="bottom"
          >
            {marker.usesDefault ? null : (
              <div className="flex flex-col items-center">
                <span className="flex items-center justify-center rounded-full bg-background/90 p-1.5 text-foreground shadow">
                  {renderMarkerIcon(marker.icon)}
                </span>
              </div>
            )}
          </Marker>
        ))}
      </Map>

      <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground shadow">
        Route preview
      </div>

      {isLoading || routeError ? (
        <div className="absolute right-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground shadow">
          {routeError ?? "Loading route..."}
        </div>
      ) : null}
    </div>
  )
}
