"use client";

import { useRouter } from "next/navigation";
import {
  useSearchState,
  useSearchStoreData,
  useStoreSearch,
} from "@/store/store";
import SearchFormNavigation from "../addstore/components/form-steps/SearchNavitage";
import TypeofBussiness from "./searchstep/TypeofBussiness";
import SearchLoaction from "./searchstep/Loaction";
import Price from "../addstore/components/form-steps/Price";
import { useEffect, useState } from "react";

const Findstore = () => {
  const {
    TypeofStore,
    country,
    state,
    city,
    pin,
    minprice,
    maxprice,
    setUserLat,
    setUserLog,
    userlat,
    userlog,
  } = useSearchStoreData();

  const [shake, setShake] = useState(false);

  const [loading, setLoading] = useState(false);
  const userGeoLoaction = async () => {
    try {
      const addressString = `${city}, ${state}, ${country}, ${pin}`;

      const res = await fetch("/api/geocode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: addressString }),
      });

      if (!res.ok) return;

      const data = await res.json();

      if (data.lat && data.lng) {
        setUserLat(data.lat);
        setUserLog(data.lng);
      }
    } catch (error) {
      console.error("Geolocation error:", error);
    }
  };

  const { sStep, prevStep, nextSStep, resetStep } = useSearchState();
  useEffect(() => {
    if (country && state && city && pin) {
      userGeoLoaction();
    }
  }, [country, state, city, pin]);

  const isStepValid =
    (sStep == 1 && TypeofStore.trim() !== "") ||
    (sStep == 2 &&
      country.trim() !== "" &&
      state.trim() !== "" &&
      city.trim() !== "" &&
      pin !== "") ||
    (sStep == 3 && minprice !== 0 && maxprice !== 0);
  const handleNext = () => {
    if (!isStepValid) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    nextSStep();
  };

  const [data, setData] = useState([]);
  const router = useRouter();
  const handleFinish = async () => {
    setLoading(true);
    try {
      const {
        userlat,
        userlog,

        minprice,
        maxprice,
      } = useSearchStoreData.getState();

      // Basic validation
      if (!userlat || !userlog) {
        console.error("User location not available");
        return;
      }

      const res = await fetch("/api/store/nearby", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userlat,
          userlog,

          minprice,
          maxprice,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch nearby stores");
      }

      const stores = await res.json();

      console.log("Nearest stores:", stores);

      setData(stores);

      setLoading(false);
    } catch (error) {
      console.error("handleFinish error:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      {sStep == 1 && (
        <div>
          <TypeofBussiness />
        </div>
      )}
      {sStep == 2 && (
        <div>
          <SearchLoaction />
        </div>
      )}
      {sStep == 3 && (
        <div>
          <Price />
        </div>
      )}

      <SearchFormNavigation
        step={sStep}
        isValid={isStepValid}
        loading={loading}
        shake={shake}
        onPrev={prevStep}
        onNext={handleNext}
        onFinish={handleFinish}
      />
    </div>
  );
};

export default Findstore;
