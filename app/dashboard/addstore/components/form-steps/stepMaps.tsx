"use client";

import Heading from "@/app/dashboard/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import CountrySelect from "./country";

const StepMaps = () => {
  const [flat, setFlat] = useState("");
  const [street, setStreet] = useState("");
  const [nearby, setNearby] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");
  const [country, setCountry] = useState("");

  const handelD = () => {
    console.log(country);
  };
  return (
    <div className="flex justify-center items-center w-full min-h-screen  px-4">
      <CountrySelect value={country} onChange={setCountry} />
      <div className="w-full max-w-2xl space-y-6">
        <Heading
          title="Confirm your address"
          description="Your address is only shared with guests after they've made a reservation."
        />

        <div className="rounded-2xl space-y-3">
          {/* Flat */}
          <Input
            value={flat}
            onChange={(e) => setFlat(e.target.value)}
            placeholder="Flat, house, etc. (if applicable)"
            className="h-15 px-5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-50"
          />

          {/* Street (required style with red border like screenshot) */}
          <Input
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            placeholder="Street address"
            className="h-15 px-5 rounded-xl"
          />

          {/* Nearby */}
          <Input
            value={nearby}
            onChange={(e) => setNearby(e.target.value)}
            placeholder="Nearby landmark (if applicable)"
            className="h-15 px-5 rounded-xl"
          />

          {/* District */}
          <Input
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            placeholder="District/locality (if applicable)"
            className="h-15 px-5 rounded-xl"
          />

          {/* City */}
          <Input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City/town"
            className="h-15 px-5 rounded-xl"
          />

          {/* State */}
          <Input
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="State/union territory"
            className="h-15 px-5 rounded-xl"
          />

          {/* PIN */}
          <Input
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="PIN code"
            className="h-15 px-5 rounded-xl"
          />
        </div>
        <button onClick={handelD}>d</button>
      </div>
    </div>
  );
};

export default StepMaps;
