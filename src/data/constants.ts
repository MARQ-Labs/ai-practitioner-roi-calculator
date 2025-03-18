
// Working time constants
export const WORK_DAYS_PER_YEAR = 230;
export const WORK_HOURS_PER_DAY = 7.5;
export const WORK_HOURS_PER_YEAR = WORK_DAYS_PER_YEAR * WORK_HOURS_PER_DAY;

// Adoption curve data
export const TIME_ADOPTION_CURVE: Record<number, number> = {
  3: 0.4,   // 40% of full benefits at 3 months
  6: 0.6,   // 60% of full benefits at 6 months
  12: 0.9,  // 90% of full benefits at 12 months
  24: 1.0   // 100% of full benefits at 24 months
};
