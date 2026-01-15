import { useEffect, useRef, useState } from 'react';
import Map, { Marker, type MapRef } from 'react-map-gl/mapbox';

import {
  StickySideScrollytelling,
  type StickySideMediaRenderProps,
  type StickySideStepRenderProps,
} from '@/components/prebuild/scrollytelling/StickySide';
import { cn } from '@/lib/utils';

import type { MediaSide } from '../types';
import { MAP_STICKY_STEPS } from './scrollytelling-data';

import 'mapbox-gl/dist/mapbox-gl.css';

function MapStickySideStep({ stepIndex, isActive }: StickySideStepRenderProps) {
  const step = MAP_STICKY_STEPS[stepIndex];

  if (!step) return null;

  return (
    <div className={cn('w-full rounded-lg border border-border/60 p-4 transition-colors', isActive && 'border-border')}>
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{step.kicker}</p>
      <h3 className="mt-2 text-2xl font-semibold text-foreground">{step.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{step.location}</p>
    </div>
  );
}

function MapStickySideMedia({ stepIndex }: StickySideMediaRenderProps) {
  const step = MAP_STICKY_STEPS[stepIndex] ?? MAP_STICKY_STEPS[0];
  const mapboxToken = import.meta.env.MAPBOX_API_TOKEN as string | undefined;
  const mapRef = useRef<MapRef | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    if (!step || !isMapReady || !mapRef.current) return;
    mapRef.current.flyTo({
      center: step.coordinate,
      zoom: step.zoom,
      duration: 1200,
      essential: true,
    });
  }, [isMapReady, step]);

  if (!step) return null;

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg border border-border">
      <Map
        ref={mapRef}
        mapboxAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        initialViewState={{
          longitude: step.coordinate[0],
          latitude: step.coordinate[1],
          zoom: step.zoom,
        }}
        onLoad={() => setIsMapReady(true)}
        scrollZoom={false}
        dragPan={false}
        reuseMaps
        style={{ width: '100%', height: '100%' }}
      >
        <Marker longitude={step.coordinate[0]} latitude={step.coordinate[1]} anchor="center">
          <div className="h-3 w-3 rounded-full bg-primary shadow ring-4 ring-primary/20" />
        </Marker>
      </Map>

      <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground shadow">
        {step.location}
      </div>
    </div>
  );
}

type MapStickySideSectionProps = {
  mediaSide: MediaSide;
};

export function MapStickySideSection({ mediaSide }: MapStickySideSectionProps) {
  return (
    <StickySideScrollytelling
      mediaSide={mediaSide}
      steps={MAP_STICKY_STEPS.length}
      getMediaKey={() => 'map-sticky'}
      StepComponent={MapStickySideStep}
      MediaComponent={MapStickySideMedia}
    />
  );
}
