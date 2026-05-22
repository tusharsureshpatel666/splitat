export const SHARE_MODE_MAP = {
  HOURS_BY_HOURS: "HOURS_BY_HOURS",
  DAYS_BY_DAYS: "DAYS_BY_DAYS",
  SPLIT_STORE: "SPLIT_STORE",
  DAY_OR_NIGHT: "DAY_OR_NIGHT",
  Weekend: "WEEKEND",
  Regular: "REGULAR",
} as const;

const prismaShareMode = SHARE_MODE_MAP[share.mode];
