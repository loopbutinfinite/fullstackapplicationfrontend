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