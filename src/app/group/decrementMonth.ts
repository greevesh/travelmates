import { MonthProps } from "./types";

const decrementMonth = ({
  currentMonth,
  currentYear,
  setCurrentMonth,
  setCurrentYear,
}: MonthProps): void => {
  if (currentMonth === 0) {
    setCurrentMonth(11);
    setCurrentYear(currentYear - 1);
  } else {
    setCurrentMonth(currentMonth - 1);
  }
};

export default decrementMonth;
