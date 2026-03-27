"use client";

import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./styles.css"

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

export default function MapComponent() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-121.229088, 37.907669],
      zoom: 13,
    });

    mapRef.current = map;

    // Add controls
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    new mapboxgl.Marker({ color: "purple" })
      .setLngLat([-121.229088, 37.907669])
      .addTo(map);

    const el = document.createElement("div");
    el.className = "custom-marker";

    new mapboxgl.Marker({ element: el })
      .setLngLat([-121.229088, 37.907669])
      .addTo(map);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      ref={mapContainerRef}
      className="absolute inset-0 w-full h-full"
    />
  );
}