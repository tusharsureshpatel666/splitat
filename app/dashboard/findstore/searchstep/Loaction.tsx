import React from "react";
import Heading from "../../components/heading";
import { useSearchStoreData } from "@/store/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DELHI_CITIES = [
  "Connaught Place",
  "Karol Bagh",
  "Chandni Chowk",
  "Lajpat Nagar",
  "South Extension",
  "Saket",
  "Malviya Nagar",
  "Greater Kailash",
  "Hauz Khas",
  "Vasant Kunj",
  "Dwarka",
  "Janakpuri",
  "Rajouri Garden",
  "Punjabi Bagh",
  "Pitampura",
  "Rohini",
  "Model Town",
  "Civil Lines",
  "Mayur Vihar",
  "Preet Vihar",
  "Laxmi Nagar",
  "Shahdara",
  "Okhla",
  "Nehru Place",
  "Kalkaji",
  "Uttam Nagar",
  "Najafgarh",
];

const SearchLocation = () => {
  const {
    country,
    setCountry,
    state,
    setState,
    city,
    setCity,

    pin,
    setPin,
  } = useSearchStoreData();

  // set default values once
  React.useEffect(() => {
    setCountry("India");
    setState("Delhi");
  }, [setCountry, setState]);

  return (
    <div className="w-full flex flex-col items-center">
      <Heading
        title="Which Location Are You Looking For?"
        description="Tell us the location where you want to open your store so we can help you find the right store partner."
        className="text-center max-w-4xl"
      />

      {/* Card */}
      {/* <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={handleUseCurrentLocation}
          disabled={loadingLocation}
        >
          {loadingLocation ? "Fetching..." : "Use Current Location"}
        </Button>
      </div> */}

      {/* Country + State */}
      <div className="grid grid-cols-1 gap-4 mt-4 w-full sm:grid-cols-2">
        <div className="space-y-3">
          <Label>Country</Label>
          <Input
            disabled
            className="w-full py-6 justify-start text-muted-foreground"
            value={country}
          />
        </div>

        <div className="space-y-3 w-full">
          <Label>State</Label>
          <Input
            disabled
            className="w-full py-6 justify-start text-muted-foreground"
            value={state}
          />
        </div>
      </div>

      {/* City */}
      <div className="space-y-4 mt-4 w-full">
        <Label>Area / City</Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between py-6  font-normal"
            >
              {city || "Select area"}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="max-h-60 w-[var(--radix-dropdown-menu-trigger-width)] overflow-y-auto">
            {DELHI_CITIES.map((c) => (
              <DropdownMenuItem
                key={c}
                onClick={() => setCity(c)}
                className="cursor-pointer"
              >
                {c}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* PIN */}
      <div className="space-y-3 mt-4 w-full">
        <Label>PIN Code</Label>
        <Input
          type="text"
          maxLength={6}
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
          placeholder="1100XX"
          className="w-full py-6 justify-start text-muted-foreground"
        />
      </div>

      {/* Full Address */}
    </div>
  );
};

export default SearchLocation;
