"use client";

import { useState } from "react";
import { LocateFixed } from "lucide-react";
import {
  getCurrentPosition,
  reverseGeocode,
  ReverseGeocodeResult,
} from "@/data/lib/geocoding-services";

interface UseMyLocationButtonProps {
  onLocationResolved: (location: ReverseGeocodeResult) => void;
  onError?: (message: string) => void;
  className?: string;
}

export default function UseMyLocationButton({
  onLocationResolved,
  onError,
  className = "",
}: UseMyLocationButtonProps) {
  const [isLocating, setIsLocating] = useState(false);
  const [localError, setLocalError] = useState("");

  const handleClick = async () => {
    setLocalError("");
    setIsLocating(true);

    try {
      const { lat, lng } = await getCurrentPosition();
      const resolved = await reverseGeocode(lat, lng);

      if (!resolved) {
        throw new Error(
          "We couldn't turn your location into an address. Please enter it manually."
        );
      }

      onLocationResolved(resolved);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong getting your location.";
      setLocalError(message);
      onError?.(message);
    } finally {
      setIsLocating(false);
    }
  };

  return (
    <div className={className}>
      <button
        type="button"
        onClick={handleClick}
        disabled={isLocating}
        className="w-full flex items-center justify-center gap-2 bg-[#3a3a3a] hover:bg-[#454545] border border-[#C95A23]/60 text-[#f0a878] hover:text-white disabled:opacity-60 disabled:cursor-not-allowed font-semibold py-2.5 rounded-lg transition-colors text-sm"
      >
        {isLocating ? (
          <>
            <span className="w-4 h-4 border-2 border-[#C95A23] border-t-transparent rounded-full animate-spin" />
            Getting your location...
          </>
        ) : (
          <>
            <LocateFixed size={16} />
            Use my current location
          </>
        )}
      </button>

      {localError && (
        <p className="text-[#ff6b6b] text-xs mt-2 text-center">{localError}</p>
      )}
    </div>
  );
}
