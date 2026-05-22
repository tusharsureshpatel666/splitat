"use client";
import Heading from "@/app/dashboard/components/heading";
import { useParticStore } from "@/store/store";
import Image from "next/image";
import { useState } from "react";

const StoreMethodtype = () => {
  const { share, setMode, updateShare } = useParticStore();
  const DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ] as const;

  const { mode } = share;

  console.log("mode", mode);
  return (
    <div className="w-full">
      {mode === "HOURS_BY_HOURS" && (
        <>
          <Heading
            title="Share By Hours"
            description="How much time you wanna share your store"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <div className="space-y-1">
              <label className="text-sm font-medium">Start Time</label>
              <input
                type="time"
                value={share.startTime}
                onChange={(e) => updateShare({ startTime: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">End Time</label>
              <input
                type="time"
                value={share.endTime}
                onChange={(e) => updateShare({ endTime: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
              />
            </div>
          </div>
        </>
      )}
      {mode === "DAYS_BY_DAYS" && (
        <>
          <Heading
            title="Share By Days"
            description="Select the days you want to share your store"
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5">
            {DAYS.map((day) => {
              const isSelected = share.days?.includes(day);

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => {
                    const updatedDays = isSelected
                      ? share.days?.filter((d) => d !== day)
                      : [...(share.days ?? []), day];

                    updateShare({ days: updatedDays });
                  }}
                  className={`px-4 py-6 rounded-lg border  text-sm cursor-pointer font-medium transition
              ${
                isSelected
                  ? "border-blue-500 bg-blue-500 text-white"
                  : "border-gray-300 hover:border-blue-500"
              }
            `}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </>
      )}
      {mode === "SPLIT_STORE" && (
        <div className="flex justify-center items-center flex-col">
          <Heading
            title="Choose Your Sharing Space"
            description="Specify how much space you’re willing to share (in sq ft)."
            className="text-center"
          />

          <div className=" mt-5 ">
            <input
              type="number"
              min={1}
              placeholder="300 sq(feet)"
              value={share.sqft ?? ""}
              onChange={(e) =>
                updateShare({
                  sqft: e.target.value === "" ? null : Number(e.target.value),
                })
              }
              className="
         
          caret-black dark:caret-white
          placeholder:text-gray-400
              no-spinner
            w-[200px]
            text-6xl
            font-semibold
            text-center
            bg-transparent
            outline-none
            border-none
            focus:ring-0
          dark:text-white
          
        "
            />
          </div>
        </div>
      )}
      {mode === "DAY_OR_NIGHT" && (
        <>
          <Heading
            title="Choose Time of Day"
            description="Select whether you want to share your store during the DAY_OR_NIGHT."
          />

          <div className="grid grid-cols-2 gap-4 mt-4">
            {[
              { label: "Day", emoji: "🌞" },
              { label: "Night", emoji: "🌙" },
            ].map(({ label, emoji }) => {
              const isActive = share.dayOrNight === label;

              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => updateShare({ dayOrNight: label })}
                  className={`flex flex-col items-center cursor-pointer justify-center gap-2
              px-4 py-5 rounded-xl border font-semibold transition
              ${
                isActive
                  ? "border-blue-500 bg-blue-500 text-white"
                  : "border-gray-300 hover:border-blue-500"
              }
            `}
                >
                  <span className="text-3xl">{emoji}</span>
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
      {mode === "Weekend" && (
        <div className="flex justify-center flex-col-reverse space-y-5 items-center">
          <Heading
            title="Weekend got Selected"
            description="weekend got selected please move on the other step"
            className="text-center flex justify-center items-center"
          />
          <Image
            src={"/partic/weekend.svg"}
            alt="hello"
            width={150}
            height={150}
          />
        </div>
      )}
      {mode === "Regular" && (
        <div className="flex justify-center flex-col-reverse space-y-5 items-center">
          <Heading
            title="Regular got Selected"
            description="We find you the best partner you can work with please move forword"
            className="text-center flex justify-center items-center"
          />
          <Image
            className="mb-5"
            src={"/partic/work.svg"}
            alt="hello"
            width={450}
            height={550}
          />
        </div>
      )}
    </div>
  );
};

export default StoreMethodtype;
