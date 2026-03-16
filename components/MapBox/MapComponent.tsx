"use client";

import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Set access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

export default function MapComponent() {
  // Use HTMLDivElement type for the ref
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      // Initialize map
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-74.5, 40],
        zoom: 9,
      });

      // Add navigation controls (zoom/rotate)
      mapRef.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    }

    // Cleanup on unmount
    return () => {
      mapRef.current?.remove();
    };
  }, []);

  return (
    <div 
      ref={mapContainerRef}
      className='absolute inset-0 w-full h-full'
    />
  );
}