import formatDate from "../../create-journey/formatDate";
import sortDateRanges from "../sortDateRanges";
import { fetchJourneys } from "./fetchJourneys";
import { fetchMonth, fetchYear } from "../../globals";
import { FetchRowDataParams } from "../types";

const calculateDaysBetween = (start: Date, end: Date): number =>
  Math.floor((end - start) / (24 * 60 * 60 * 1000));

const fetchDateRangeLengths = async ({
  currentMonth,
  currentYear,
}: FetchRowDataParams): Promise<number[]> => {
  const journeys = await fetchJourneys();

  const currentMonthAndYearDateRangeLengths = journeys
    .map((journey) => {
      const { start, end } = journey.dateRange;
      if (start && end) {
        const startDate: Date = formatDate(start.seconds);
        const endDate: Date = formatDate(end.seconds);
        const formattedDays = calculateDaysBetween(startDate, endDate);
        return { journey, length: formattedDays };
      }
      return null;
    })
    .filter((dateRangeLength) => {
      if (!dateRangeLength) return false;
      const { start, end } = dateRangeLength.journey.dateRange;
      return (
        fetchMonth(start) === currentMonth || fetchMonth(end) === currentMonth
      );
    })
    .filter((dateRangeLength) => {
      if (!dateRangeLength) return false;
      const { start, end } = dateRangeLength.journey.dateRange;
      return fetchYear(start) === currentYear || fetchYear(end) === currentYear;
    });

  if (currentMonthAndYearDateRangeLengths.length > 1) {
    sortDateRanges(currentMonthAndYearDateRangeLengths);
  }

  return currentMonthAndYearDateRangeLengths.map((length) => length.length);
};

export default fetchDateRangeLengths;
