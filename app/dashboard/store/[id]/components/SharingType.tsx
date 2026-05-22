"use client";

import {
  Clock,
  CalendarDays,
  SunMoon,
  Users,
  CalendarCheck,
  CalendarRange,
} from "lucide-react";

/* ---------------------------------- */
type ShareType =
  | "HOURS_BY_HOURS"
  | "DAYS_BY_DAYS"
  | "DAY_OR_NIGHT"
  | "SPLIT_STORE"
  | "Weekend"
  | "Regular";

interface SharingTypeProps {
  sharetype: ShareType;
  partnerBussiness?: string;
  startTime?: string;
  endTime?: string;
  days?: string[];
  split?: string;
  dayOrNight?: "Day" | "Night";
}

/* ---------------------------------- */

const shareTypeLabels: Record<ShareType, string> = {
  HOURS_BY_HOURS: "Hourly Sharing",
  DAYS_BY_DAYS: "Daily Sharing",
  DAY_OR_NIGHT: "Day / Night Slot",
  SPLIT_STORE: "Split Store Partnership",
  Weekend: "Weekend Sharing",
  Regular: "Regular Sharing",
};

const shareTypeDescriptions: Record<ShareType, string> = {
  HOURS_BY_HOURS:
    "I’m offering my store for specific hours of the day. If your business works best during certain peak hours, you can operate here without taking the full day.",
  DAYS_BY_DAYS:
    "I’m making my store available on selected days of the week. You can choose the days that suit your business and run it regularly.",
  DAY_OR_NIGHT:
    "You can use my store either during the daytime or nighttime, depending on what fits your business model better.",
  SPLIT_STORE:
    "I’m open to sharing my store space with a compatible business so we can both operate and benefit together.",
  Weekend:
    "My store is available on weekends when footfall is higher. Perfect for targeting Saturday and Sunday customers.",
  Regular:
    "My store is available on regular working days. You can operate consistently during weekdays and build your customer base.",
};

const shareTypeIcons: Record<ShareType, JSX.Element> = {
  HOURS_BY_HOURS: <Clock size={20} />,
  DAYS_BY_DAYS: <CalendarDays size={20} />,
  DAY_OR_NIGHT: <SunMoon size={20} />,
  SPLIT_STORE: <Users size={20} />,
  Weekend: <CalendarCheck size={20} />,
  Regular: <CalendarRange size={20} />,
};

/* ---------------------------------- */

export default function SharingType({
  sharetype,
  partnerBussiness,
  startTime,
  endTime,
  days,
  dayOrNight,
  split,
}: SharingTypeProps) {
  const renderDetails = () => {
    switch (sharetype) {
      case "HOURS_BY_HOURS":
        return (
          <div className="mt-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4 text-center">
            <p className="text-xs uppercase tracking-wide text-blue-500 dark:text-blue-400 font-medium">
              Available Time Slot
            </p>
            <p className="text-lg font-semibold text-blue-700 dark:text-blue-300 mt-1">
              {startTime} – {endTime}
            </p>
          </div>
        );

      case "DAYS_BY_DAYS":
        return (
          <div className="mt-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl p-4">
            <p className="text-xs uppercase tracking-wide text-green-600 dark:text-green-400 font-medium mb-2">
              Available Days
            </p>
            <div className="flex flex-wrap gap-2">
              {days?.map((day) => (
                <span
                  key={day}
                  className="text-sm bg-white dark:bg-gray-800 
                             text-gray-800 dark:text-gray-200
                             px-3 py-1 rounded-full 
                             border border-green-300 dark:border-green-700 
                             font-medium"
                >
                  {day}
                </span>
              ))}
            </div>
          </div>
        );

      case "DAY_OR_NIGHT":
        return (
          <div className="mt-4 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 rounded-xl p-4 text-center">
            <p className="text-xs uppercase tracking-wide text-purple-500 dark:text-purple-400 font-medium">
              Selected Slot
            </p>
            <p className="text-lg font-semibold text-purple-700 dark:text-purple-300 mt-1">
              {dayOrNight} Operation
            </p>
          </div>
        );

      case "SPLIT_STORE":
        return (
          <div className="mt-4 bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 rounded-xl p-4">
            <p className="text-xs uppercase tracking-wide text-orange-500 dark:text-orange-400 font-medium">
              Preferred Partner
            </p>
            <p className="text-base font-semibold text-orange-700 dark:text-orange-300 mt-1">
              {partnerBussiness} {split} sq
            </p>
          </div>
        );

      case "Weekend":
        return (
          <div className="mt-4 bg-pink-50 dark:bg-pink-900/30 border border-pink-200 dark:border-pink-800 rounded-xl p-4 text-center">
            <p className="text-xs uppercase tracking-wide text-pink-500 dark:text-pink-400 font-medium mb-2">
              Weekend Availability
            </p>
            <p className="text-lg font-semibold text-pink-700 dark:text-pink-300">
              Saturday & Sunday
            </p>
          </div>
        );

      case "Regular":
        return (
          <div className="mt-4 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 rounded-xl p-4 text-center">
            <p className="text-xs uppercase tracking-wide text-indigo-500 dark:text-indigo-400 font-medium mb-2">
              Weekday Availability
            </p>
            <p className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">
              Monday – Friday
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="border rounded-2xl p-6 shadow-md hover:shadow-lg transition space-y-4
                 bg-white dark:bg-black
                 border-gray-200 dark:border-gray-700"
    >
      {/* Title */}
      <div className="flex items-center gap-3 text-base font-semibold text-gray-800 dark:text-gray-100">
        <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
          {shareTypeIcons[sharetype]}
        </div>
        {shareTypeLabels[sharetype]}
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
        {shareTypeDescriptions[sharetype]}
      </p>

      {/* Highlighted Slot Section */}
      {renderDetails()}
    </div>
  );
}
