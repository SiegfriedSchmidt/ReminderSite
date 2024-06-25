function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function getDayOfYear(date: Date): number {
  const daysInMonth = [31, isLeapYear(date.getFullYear()) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let dayOfYear = 0;
  for (let i = 0; i < date.getMonth(); i++) {
    dayOfYear += daysInMonth[i];
  }
  dayOfYear += date.getDate();
  return dayOfYear;
}

export default function getDaysBetween(currentDate: Date, targetDate: Date): number {
  const currentYear = currentDate.getFullYear();
  const targetThisYear = new Date(currentYear, targetDate.getMonth(), targetDate.getDate());
  const currentDateThisYear = new Date(currentYear, currentDate.getMonth(), currentDate.getDate());

  if (currentDateThisYear <= targetThisYear) {
    // Target date is later this year or today
    return getDayOfYear(targetThisYear) - getDayOfYear(currentDate);
  } else {
    // Target date is next year
    const nextYear = currentYear + 1;
    const targetNextYear = new Date(nextYear, targetDate.getMonth(), targetDate.getDate());
    const daysRemainingThisYear = (isLeapYear(currentYear) ? 366 : 365) - getDayOfYear(currentDate);
    return daysRemainingThisYear + getDayOfYear(targetNextYear);
  }
}
