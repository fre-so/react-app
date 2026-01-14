import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import type { ComponentsGalleryNavItem, ControlConfigMap as GalleryControlConfigMap } from './types';
import { MAPS_NAV_ITEMS, MAPS_CONTROLS } from './maps';
import { SCROLLYTELLING_NAV_ITEMS, SCROLLYTELLING_CONTROLS, type MediaSide } from './scrollytelling';
import { TIMELINE_NAV_ITEMS, TIMELINE_CONTROLS } from './timeline';
import { DATA_CONTROLS, DATA_NAV_ITEMS } from './data';

const CONTROL_CONFIGS = {
  ...SCROLLYTELLING_CONTROLS,
  ...TIMELINE_CONTROLS,
  ...MAPS_CONTROLS,
  ...DATA_CONTROLS,
} as const satisfies GalleryControlConfigMap;

type ControlConfigMap = typeof CONTROL_CONFIGS;
type ControlId = keyof ControlConfigMap;

type ControlStateMap = {
  [Key in ControlId]: {
    value: ControlConfigMap[Key]['options'][number]['value'];
    onChange: (value: ControlConfigMap[Key]['options'][number]['value']) => void;
  };
};

const COMPONENTS_GALLERY_NAV = [
  ...SCROLLYTELLING_NAV_ITEMS,
  ...TIMELINE_NAV_ITEMS,
  ...MAPS_NAV_ITEMS,
  ...DATA_NAV_ITEMS,
] satisfies ComponentsGalleryNavItem<ControlId>[];

export default function ComponentsGallery() {
  const [activeComponentId, setActiveComponentId] = useState(() => {
    if (typeof window === 'undefined') {
      return COMPONENTS_GALLERY_NAV[0]?.id ?? '';
    }
    const hash = window.location.hash.replace(/^#/, '');
    const match = COMPONENTS_GALLERY_NAV.find((item) => item.id === hash);
    return match?.id ?? COMPONENTS_GALLERY_NAV[0]?.id ?? '';
  });
  const [mediaSide, setMediaSide] = useState<MediaSide>('right');
  const [mapRouteProgress, setMapRouteProgress] = useState('0.5');
  const activeComponent = COMPONENTS_GALLERY_NAV.find((item) => item.id === activeComponentId);
  const activeControls = activeComponent?.controls ?? [];
  const hasControls = activeControls.length > 0;
  const controlState: ControlStateMap = {
    mediaSide: { value: mediaSide, onChange: setMediaSide },
    mapRouteProgress: { value: mapRouteProgress, onChange: setMapRouteProgress },
  };

  const parsedMapRouteProgress = Number(mapRouteProgress);
  const resolvedMapRouteProgress = Number.isFinite(parsedMapRouteProgress) ? parsedMapRouteProgress : undefined;

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#/, '');
      const match = COMPONENTS_GALLERY_NAV.find((item) => item.id === hash);
      const nextId = match?.id ?? COMPONENTS_GALLERY_NAV[0]?.id ?? '';
      setActiveComponentId((current) => (current === nextId ? current : nextId));
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !activeComponentId) {
      return;
    }
    const nextHash = `#${activeComponentId}`;
    if (window.location.hash !== nextHash) {
      window.location.hash = activeComponentId;
    }
  }, [activeComponentId]);

  const renderControl = <Key extends ControlId>(controlId: Key) => {
    const config = CONTROL_CONFIGS[controlId];
    const state = controlState[controlId];

    return (
      <div key={controlId} className="space-y-3">
        <p className="text-sm font-medium text-foreground">{config.label}</p>
        <div className="flex flex-col gap-2">
          {config.options.map((option) => {
            const isActive = option.value === state.value;
            return (
              <button
                key={option.value}
                type="button"
                className={cn(
                  'cursor-pointer border border-border px-3 py-2 text-left text-sm transition-colors hover:bg-muted/60',
                  isActive && 'bg-muted'
                )}
                onClick={() => state.onChange(option.value)}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="fixed left-0 top-0 h-screen w-72 border-r border-border p-6">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Components</p>
          <h1 className="text-lg font-semibold">Demo Gallery</h1>
        </div>

        <nav className="mt-6 space-y-2">
          {COMPONENTS_GALLERY_NAV.map((item) => {
            const isActive = item.id === activeComponentId;
            return (
              <button
                key={item.id}
                type="button"
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'w-full cursor-pointer border border-border px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-muted/60',
                  isActive && 'bg-muted'
                )}
                onClick={() => setActiveComponentId(item.id)}
              >
                {item.title}
              </button>
            );
          })}
        </nav>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Controls</p>
          {hasControls ? (
            <div className="mt-4 space-y-6">{activeControls.map((controlId) => renderControl(controlId))}</div>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">Select a component to see its controls.</p>
          )}
        </div>
      </aside>

      <main className="min-h-screen pl-72">
        <div className="p-8">
          {activeComponent ? (
            <section className="space-y-4">
              <div className="min-h-40">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  {activeComponent.section.eyebrow}
                </p>
                <h2 className="mt-2 text-xl font-semibold">{activeComponent.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{activeComponent.section.description}</p>
              </div>
              <div className="border border-border">
                {activeComponent.section.render({
                  mediaSide,
                  mapRouteProgress: resolvedMapRouteProgress,
                })}
              </div>
            </section>
          ) : (
            <p className="text-sm text-muted-foreground">Select a component from the sidebar.</p>
          )}
          <section className="mt-16 flex h-screen items-center justify-center rounded-lg border border-dashed border-border bg-muted/40 p-6">
            <div className="max-w-md space-y-3 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Placeholder</p>
              <h3 className="text-lg font-semibold text-foreground">Sticky release test section</h3>
              <p className="text-sm text-muted-foreground">
                Extra viewport-height content to verify sticky panels stop after the component scrolls away.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
