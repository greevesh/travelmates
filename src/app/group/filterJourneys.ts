/* eslint-disable indent */
import { Journey } from "../create-journey/types";
import { fetchMonth, fetchYear } from "../globals";

const filterJourneys =
  () =>
  (
    journeys: Journey[],
    currentMonth: number,
    currentYear: number
  ): Journey[] => {
    const journeysSet = new Set(
      journeys.filter((journey) => typeof journey !== "string")
    );

    const filteredJourneys = [...journeysSet];

    return filteredJourneys.filter((journey) => {
      const { start, end } = journey.dateRange;
      const currentMonthMatch: boolean =
        fetchMonth(start) === currentMonth || fetchMonth(end) === currentMonth;
      const currentYearMatch: boolean =
        fetchYear(start) === currentYear || fetchYear(end) === currentYear;
      return currentMonthMatch && currentYearMatch;
    });
  };

export default filterJourneys;
