"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./styles.css";

import { geocodeAddress } from "@/data/lib/geocoding-services";
import { BusinessModel } from "@/data/Interfaces/Interfaces";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

interface SingleBusinessMapProps {
  business: BusinessModel;
}

export default function SingleBusinessMapComponent({
  business,
}: SingleBusinessMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-121.29324, 37.954707],
      zoom: 15,
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");
    mapRef.current = map;

    return () => {
      markerRef.current?.remove();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !business) return;

    let isCancelled = false;

    const updateMap = async () => {
      const map = mapRef.current;
      if (!map) return;

      const address = `${business.streetName}, ${business.city}, ${business.state} ${business.zipCode}`;
      const coords = await geocodeAddress(address);

      if (!coords || isCancelled) return;

      markerRef.current?.remove();

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div>
          <h3 style="color:black; font-weight:bold; margin-bottom:4px;">
            ${business.businessName}
          </h3>
          <p style="color:black; margin:0;">${address}</p>
          <p style="color:black; margin:4px 0 0 0;">${business.businessPhoneNumber}</p>
        </div>
      `);

      const marker = new mapboxgl.Marker({ color: "purple" })
        .setLngLat([coords.lng, coords.lat])
        .setPopup(popup)
        .addTo(map);

      markerRef.current = marker;

      map.flyTo({
        center: [coords.lng, coords.lat],
        zoom: 15,
        essential: true,
      });

      setTimeout(() => {
        map.resize();
      }, 0);
    };

    updateMap();

    return () => {
      isCancelled = true;
    };
  }, [business]);

  return <div ref={mapContainerRef} className="w-full h-full" />;
}