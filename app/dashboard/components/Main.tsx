"use client";

import { useEffect, useRef, useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { Search, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

const libraries: "places"[] = ["places"];

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);

  const boundsRef = useRef<google.maps.LatLngBounds | null>(null);

  // ✅ Use same loader everywhere
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Initialize services AFTER script loads
  useEffect(() => {
    if (!isLoaded || !window.google) return;

    autocompleteService.current =
      new window.google.maps.places.AutocompleteService();

    placesService.current = new window.google.maps.places.PlacesService(
      document.createElement("div"),
    );

    boundsRef.current = new window.google.maps.LatLngBounds(
      { lat: 28.4, lng: 76.84 },
      { lat: 28.88, lng: 77.35 },
    );
  }, [isLoaded]);

  const handleChange = (value: string) => {
    setQuery(value);

    if (!value || !autocompleteService.current) {
      setResults([]);
      return;
    }

    autocompleteService.current.getPlacePredictions(
      {
        input: value,
        componentRestrictions: { country: "in" },
        bounds: boundsRef.current!,
        strictBounds: true,
      },
      (predictions) => {
        setResults(predictions || []);
        setOpen(true);
      },
    );
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        router.push(
          `/dashboard/search?lat=${lat}&lng=${lng}&place=Current Location`,
        );
      },
      () => {
        alert("Location permission denied");
      },
    );
  };

  const handleSelect = (placeId: string, description: string) => {
    setQuery(description);
    setOpen(false);

    placesService.current?.getDetails({ placeId }, (place) => {
      if (!place?.geometry?.location) return;

      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      router.push(
        `/dashboard/search?lat=${lat}&lng=${lng}&place=${encodeURIComponent(
          description,
        )}`,
      );
    });
  };

  if (!isLoaded) return null;

  return (
    <div className="relative w-full max-w-6xl" ref={wrapperRef}>
      {/* Search Bar */}
      <div className="flex items-center rounded-full border border-gray-300 bg-white dark:bg-slate-950 dark:border-gray-800 shadow-lg">
        <div className="flex flex-1 items-center gap-3 px-6 py-5">
          <Search className="h-5 w-5 text-gray-500" />
          <input
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Search area in New Delhi"
            className="w-full bg-transparent text-sm outline-none placeholder:text-gray-500"
            onFocus={() => setOpen(true)}
          />
        </div>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-2 w-full rounded-xl border bg-white dark:bg-slate-950 shadow-xl">
          <button
            onClick={handleCurrentLocation}
            className="flex w-full items-center gap-3 px-4 py-5 text-left text-sm font-medium text-blue-600  dark:hover:bg-gray-800 cursor-pointer  hover:bg-gray-100"
          >
            <MapPin className="h-4 w-4" />
            Use Current Location
          </button>

          {results.length > 0 && <div className="h-px bg-gray-200" />}

          {results.map((item) => (
            <button
              key={item.place_id}
              onClick={() => handleSelect(item.place_id, item.description)}
              className="flex w-full items-center gap-3 px-4 py-5 text-left text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <MapPin className="h-4 w-4 text-gray-500" />
              {item.description}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
