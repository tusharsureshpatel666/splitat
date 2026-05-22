export type ParticOption =
  | "HOURS_BY_HOURS"
  | "DAYS_BY_DAYS"
  | "SPLIT_STORE"
  | "DAY_OR_NIGHT"
  | "Weekend"
  | "Regular"
  | "";

export type ParticItem = {
  value: ParticOption;
  title: string;
  image: string;
};

export type ShareConfig = {
  mode: ParticOption;

  // HOURS_BY_HOURS
  startTime?: string;
  endTime?: string;

  // DAYS_BY_DAYS
  days?: string[];

  // SPLIT_STORE
  sqft?: number;

  // DAY_OR_NIGHT
  dayOrNight?: string;

  // Regular / Weekend → no extra data needed
};
