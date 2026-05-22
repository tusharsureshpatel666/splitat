import HourImg from "@/public/partic/hour.svg";
import DayImg from "@/public/partic/day.svg";
import SplitImg from "@/public/partic/split.svg";
import NightImg from "@/public/partic/night.svg";
import WeekendImg from "@/public/partic/weekend.svg";
import RegularImg from "@/public/partic/work.svg";
import { ParticItem } from "./Partitiontype";

export const PARTIC_OPTIONS: ParticItem[] = [
  {
    value: "HOURS_BY_HOURS",
    title: "Hourly Basis",
    image: HourImg,
  },
  {
    value: "DAYS_BY_DAYS",
    title: "Day by Day",
    image: DayImg,
  },
  {
    value: "SPLIT_STORE",
    title: "SPLIT_STORE",
    image: SplitImg,
  },
  {
    value: "DAY_OR_NIGHT",
    title: "Day / Night",
    image: NightImg,
  },
  {
    value: "Weekend",
    title: "Weekend Only",
    image: WeekendImg,
  },
  {
    value: "Regular",
    title: "Regular",
    image: RegularImg,
  },
];
