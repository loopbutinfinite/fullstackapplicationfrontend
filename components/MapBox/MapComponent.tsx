"use client";

import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./styles.css";

import { getAllBusinesses } from "@/data/lib/business-services";
import { geocodeAddress } from "@/data/lib/geocoding-services";
import { BusinessModel } from "@/data/Interfaces/Interfaces";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

export default function MapComponent() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const [businesses, setBusinesses] = useState<BusinessModel[]>([]);

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
    const fetchBusinesses = async () => {
      const data = await getAllBusinesses();
      setBusinesses(data);
    };

    fetchBusinesses();
  }, []);

  useEffect(() => {
    if (!mapRef.current || businesses.length === 0) return;

    const map = mapRef.current;

    const addMarkers = async () => {
      for (const business of businesses) {
        const address = `${business.streetName}, ${business.city}, ${business.state} ${business.zipCode}`;

        const coords = await geocodeAddress(address);
        if (!coords) continue;

        //This is the small popup when the user clicks on the map
        //Offset param is the y axis placement of the popup when a map marker is clicked
        //Add a feature later to make user's favorites a custom marker.
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <h3 style="color: black; font-weight:bold;">${business.businessName}</h3>
          <p style="color: black;">${address}</p>
          <p style="color: black;">${business.businessPhoneNumber}</p>
        `);

        new mapboxgl.Marker({ color: "purple" })
          .setLngLat([coords.lng, coords.lat])
          .setPopup(popup)
          .addTo(map);
      }
    };

    addMarkers();
  }, [businesses]);

  return (
    <div
      ref={mapContainerRef}
      className="absolute inset-0 w-full h-full"
    />
  );
}





// "use client";

// import { useRef, useEffect, useState } from "react";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import "./styles.css"
// import { getAllBusinesses } from "@/data/lib/business-services";
// import { geocodeAddress } from "@/data/lib/geocoding-services";
// import { BusinessModel } from "@/data/Interfaces/Interfaces";

// mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

// export default function MapComponent() {
//   const mapContainerRef = useRef<HTMLDivElement | null>(null);
//   const mapRef = useRef<mapboxgl.Map | null>(null);

//   useEffect(() => {
//     if (!mapContainerRef.current || mapRef.current) return;

//     // Initialize map
//     const map = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: "mapbox://styles/mapbox/streets-v12",
//       center: [-121.229088, 37.907669],
//       zoom: 13,
//     });
//     const [businesses, setBusinesses] = useState<BusinessModel[]>([]);
    
//       useEffect(() => {
//         const fetchBusinesses = async () => {
//           // const token = localStorage.getItem("token"); // or however you store it
//           // if (!token) return;
    
//           const data = await getAllBusinesses();
//           setBusinesses(data);
//         };
    
//         fetchBusinesses();
//       }, []);

//   useEffect(() => {
//   if (!mapRef.current || !businesses) return;

//   const map = mapRef.current;

//   const addMarkers = async () => {
//     for (const business of businesses) {
//       const address = `${business.streetName}, ${business.city}, ${business.state} ${business.zipCode}`;

//       const coords = await geocodeAddress(address);

//       if (!coords) continue;

//       const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
//         <h3 style="font-weight:bold;">${business.businessName}</h3>
//         <p>${address}</p>
//         <p>${business.businessPhoneNumber}</p>
//       `);

//       new mapboxgl.Marker({ color: "#C95A23" })
//         .setLngLat([coords.lng, coords.lat])
//         .setPopup(popup)
//         .addTo(map);
//     }
//   };

//   addMarkers();
// }, [businesses]);

//     mapRef.current = map;

//     // Add controls
//     map.addControl(new mapboxgl.NavigationControl(), "top-right");

//     new mapboxgl.Marker({ color: "purple" })
//       .setLngLat([-121.229088, 37.907769])
//       .addTo(map);

//     const el = document.createElement("div");
//     el.className = "custom-marker";

//     new mapboxgl.Marker({ element: el })
//       .setLngLat([-121.229088, 37.907669])
//       .addTo(map);

//     return () => {
//       map.remove();
//       mapRef.current = null;
//     };
//   }, []);

//   return (
//     <div
//       ref={mapContainerRef}
//       className="absolute inset-0 w-full h-full"
//       // style={{ width: "100%", height: "1000px" }}
//     />
//   );
// }