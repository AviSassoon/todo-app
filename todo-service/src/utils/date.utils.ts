const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

export function isWithinNext24Hours(now: Date, dateToCheck: Date): boolean {
  if (dateToCheck < now) {
    return true;
  }

  const tomorrow = new Date(now.getTime() + ONE_DAY_IN_MILLISECONDS);
  if (dateToCheck >= now && dateToCheck <= tomorrow) {
    return true;
  }

  return false;
}
