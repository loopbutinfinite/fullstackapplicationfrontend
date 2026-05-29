export const geocodeAddress = async (address: string) => {
  const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  const res = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${token}`
  );

  const data = await res.json();

  if (data.features && data.features.length > 0) {
    const [lng, lat] = data.features[0].center;
    return { lat, lng };
  }

  return null;
};

export interface ReverseGeocodeResult {
  streetName: string;
  city: string;
  state: string;
  zipCode: number;
}

export const reverseGeocode = async (
  lat: number,
  lng: number
): Promise<ReverseGeocodeResult | null> => {
  const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  if (!token) return null;

  const res = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${token}&types=address&limit=1`
  );

  if (!res.ok) return null;

  const data = await res.json();
  const feature = data.features?.[0];
  if (!feature) return null;

  const houseNumber: string = feature.address ?? "";
  const street: string = feature.text ?? "";
  const streetName = `${houseNumber} ${street}`.trim();

  const context: Array<{ id: string; text: string; short_code?: string }> =
    feature.context ?? [];

  const findContext = (prefix: string) =>
    context.find((c) => c.id?.startsWith(prefix));

  const city =
    findContext("place")?.text ?? findContext("locality")?.text ?? "";

  const regionEntry = findContext("region");
  const state =
    regionEntry?.short_code?.split("-").pop()?.toUpperCase() ??
    regionEntry?.text ??
    "";

  const postcodeText = findContext("postcode")?.text ?? "";
  const zipDigits = postcodeText.replace(/\D/g, "").slice(0, 5);
  const zipCode = zipDigits ? Number(zipDigits) : 0;

  return { streetName, city, state, zipCode };
};

export const getCurrentPosition = (): Promise<{ lat: number; lng: number }> =>
  new Promise((resolve, reject) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      reject(new Error("Location is not supported by this browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(
              new Error(
                "Location permission was denied. Enable it or enter the address manually."
              )
            );
            break;
          case error.POSITION_UNAVAILABLE:
            reject(new Error("Your location is currently unavailable."));
            break;
          case error.TIMEOUT:
            reject(new Error("Getting your location timed out. Try again."));
            break;
          default:
            reject(new Error("Could not get your current location."));
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  });
