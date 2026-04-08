"use client";

import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./styles.css";

import { geocodeAddress } from "@/data/lib/geocoding-services";
import { BusinessModel } from "@/data/Interfaces/Interfaces";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

interface MapProps {
  businesses: BusinessModel[];
};

export default function MapComponent({businesses}: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-121.293240, 37.954707,],
      zoom: 12,
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
  if (!mapRef.current) return;

  const map = mapRef.current;

  const updateMarkers = async () => {
    // 🔥 Remove old markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    for (const business of businesses) {
      const address = `${business.streetName}, ${business.city}, ${business.state} ${business.zipCode}`;

      const coords = await geocodeAddress(address);
      if (!coords) continue;

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <h3 style="color: black; font-weight:bold;">${business.businessName}</h3>
        <p style="color: black;">${address}</p>
        <p style="color: black;">${business.businessPhoneNumber}</p>
      `);

      const marker = new mapboxgl.Marker({ color: "purple" })
        .setLngLat([coords.lng, coords.lat])
        .setPopup(popup)
        .addTo(map);

      markersRef.current.push(marker);
    }
  };

  updateMarkers();
}, [businesses]);

  return (
    <div
      ref={mapContainerRef}
      className="absolute inset-0 w-full h-full"
    />
  );
}