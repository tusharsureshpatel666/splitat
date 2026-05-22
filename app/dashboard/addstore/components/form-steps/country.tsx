"use client";

import React from "react";
import ReactCountryFlag from "react-country-flag";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CountrySelectProps = {
  value: string;
  onChange: (value: string) => void;
};

const countries = [
  { code: "IN", name: "India" },
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
];

const CountrySelect = ({ value, onChange }: CountrySelectProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className="  w-full
     py-7
    px-5
    rounded-xl
    bg-white
    border
    border-gray-300
    text-left
    focus:outline-none
    focus:ring-2
    focus:ring-blue-500
    focus:border-blue-500
    shadow-none"
      >
        <SelectValue placeholder="Country/Region" />
      </SelectTrigger>

      <SelectContent>
        {countries.map((country) => (
          <SelectItem key={country.code} value={country.code}>
            <div className="flex items-center gap-3">
              <ReactCountryFlag
                countryCode={country.code}
                svg
                style={{ width: "20px", height: "20px" }}
              />
              {country.name}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CountrySelect;
