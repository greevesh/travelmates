/* eslint-disable indent */
import formatDate from "../../create-journey/formatDate";
import { FetchRowDataParams } from "../types";
import { fetchJourneys } from "./fetchJourneys";
import { Journey } from "../../create-journey/types";

const fetchDateRanges = async ({
  currentMonth,
  currentYear,
}: FetchRowDataParams): Promise<{ start: Date; end: Date }[]> => {
  const dateRanges: { start: Date; end: Date }[] = [];
  const journeys = await fetchJourneys();

  journeys.forEach((journey: Journey) => {
    const { start, end } = journey.dateRange;
    const startDate: Date = formatDate(start.seconds);
    const endDate: Date = formatDate(end.seconds);
    dateRanges.push({ start: startDate, end: endDate });
  });

  const currentMonthDateRanges = dateRanges.filter((dateRange) => {
    const { start, end } = dateRange;
    return start.getMonth() === currentMonth || end.getMonth() === currentMonth;
  });

  const currentMonthAndYearDateRanges = currentMonthDateRanges.filter(
    (dateRange) => {
      const { start, end } = dateRange;
      return (
        start.getFullYear() === currentYear || end.getFullYear() === currentYear
      );
    }
  );

  if (currentMonthAndYearDateRanges.length > 1) {
    currentMonthAndYearDateRanges.sort(
      (a, b) => a.start.getTime() - b.start.getTime()
    );
  }

  return currentMonthAndYearDateRanges;
};

export default fetchDateRanges;
