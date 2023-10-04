import { MonthProps } from "./types";

const incrementMonth = ({
  currentMonth,
  currentYear,
  setCurrentMonth,
  setCurrentYear,
}: MonthProps): void => {
  if (currentMonth === 11) {
    setCurrentMonth(0);
    setCurrentYear(currentYear + 1);
  } else {
    setCurrentMonth(currentMonth + 1);
  }
};

export default incrementMonth;
