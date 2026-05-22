"use client";

import { useState, useRef, useEffect } from "react";
import Heading from "@/app/dashboard/components/heading";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { Loader, Loader2, MapPin } from "lucide-react";
import { IoNavigateCircle } from "react-icons/io5";

type Props = {
  setFlatNo: (v: string) => void;
  setStreet: (v: string) => void;
  setNearby: (v: string) => void;
  setDistrict: (v: string) => void;
  setCity: (v: string) => void;
  setCountry: (v: string) => void;
  Sstate: (v: string) => void;
  setPin: (v: string) => void;

  address: string; // ✅ ADD THIS
  setAddress: (v: string) => void;
};

export default function LocationPicker({
  setFlatNo,
  setStreet,
  setNearby,
  setDistrict,
  setCity,
  setCountry,
  Sstate,
  setPin,
  address,
  setAddress,
 
}: Props) {
  const [loading, setLoading] = useState(false);
  // const [address, setAddress] = useState("");
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );

  const [results, setResults] = useState<any[]>([]);
  const [open, setOpen] = useState(false); 

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });

  const DefaultLocation = { lat: 19.1, lng: 72.85 };

  // Init services
  useEffect(() => {
    if (!isLoaded || !window.google) return;

    autocompleteService.current =
      new window.google.maps.places.AutocompleteService();

    placesService.current = new window.google.maps.places.PlacesService(
      document.createElement("div"),
    );
  }, [isLoaded]);

  // Close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Parse address
  const parseAddressComponents = (components: any) => {
    if (!components) return;

    const get = (types: string[]) =>
      components.find((c: any) => types.every((t) => c.types.includes(t)))
        ?.long_name || "";

    setFlatNo(get(["subpremise"]));
    setStreet(get(["route"]));
    setNearby("");
    setDistrict(get(["sublocality_level_1"]) || get(["neighborhood"]));
    setCity(get(["locality"]) || get(["administrative_area_level_2"]));
    Sstate(get(["administrative_area_level_1"]));
    setPin(get(["postal_code"]));
    setCountry(get(["country"]));
  };

  // Typing
  const handleChange = (value: string) => {
    setAddress(value);

    if (!value || !autocompleteService.current) {
      setResults([]);
      return;
    }

    autocompleteService.current.getPlacePredictions(
      {
        input: value,
        componentRestrictions: { country: "in" },
      },
      (predictions) => {
        setResults(predictions || []);
        setOpen(true);
      },
    );
  };

  // Select place
  const handleSelect = (placeId: string, description: string) => {
    setAddress(description);
    setOpen(false);

    placesService.current?.getDetails({ placeId }, (place) => {
      if (!place?.geometry?.location) return;

      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      const loc = { lat, lng };
      setLocation(loc);

      mapRef.current?.panTo(loc);
      parseAddressComponents(place.address_components);
    });
  };

  // Current location
  const getCurrentAddress = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const latlng = { lat, lng };

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: latlng }, (res) => {
          if (res?.[0]) {
            setAddress(res[0].formatted_address);
            setLocation(latlng);
            mapRef.current?.panTo(latlng);
            parseAddressComponents(res[0].address_components);
          }
          setLoading(false);
        });
      },
      () => {
        alert("Permission denied");
        setLoading(false);
      },
    );
  };

  if (!isLoaded) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="animate-spin w-6 h-6 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto  md:px-4 px-0">
      <div className="text-center mb-4">
        <Heading
          title="Where’s your place located?"
          description="Your address is only shared with guests after booking."
        />
      </div>

      <div className="w-full h-[70vh] relative rounded-xl overflow-hidden border">
        {/* Search */}
        <div
          ref={wrapperRef}
          className="absolute top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-xl z-50"
        >
          <div className="flex items-center bg-white text-black rounded-full shadow px-6 py-5">
            <MapPin className="mr-3 text-gray-500 w-4 h-4" />
            <input
              value={address}
              onChange={(e) => handleChange(e.target.value)}
              onFocus={() => setOpen(true)}
              placeholder="Enter your address"
              className="w-full outline-none text-sm"
            />
          </div>

          {open && (
            <div className="mt-2 bg-white rounded-xl shadow max-h-60 overflow-y-auto">
              <button
                onClick={getCurrentAddress}
                className="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 text-blue-600 w-full"
              >
                {loading ? (
                  <Loader className="animate-spin w-5 h-5" />
                ) : (
                  <IoNavigateCircle className="w-5 h-5" />
                )}
                Use Current Location
              </button>

              {results.map((item) => (
                <button
                  key={item.place_id}
                  onClick={() => handleSelect(item.place_id, item.description)}
                  className="flex items-center gap-2 px-4 py-3 w-full text-black text-sm cursor-pointer hover:bg-gray-100"
                >
                  <MapPin className="w-4 h-4 text-gray-500" />
                  {item.description}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Map */}
        <GoogleMap
          center={location || DefaultLocation}
          zoom={16}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            disableDefaultUI: true,
            draggable: false, // ❌ disables drag
          }}
          onLoad={(map) => (mapRef.current = map)}
        >
          {/* Marker only when location exists */}
          {location && <Marker position={location || DefaultLocation} />}
        </GoogleMap>
      </div>
    </div>
  );
}
