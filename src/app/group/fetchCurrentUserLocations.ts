import eachDayOfInterval from "date-fns/eachDayOfInterval";
import { Journey, DateRange } from "../create-journey/types";
import { fetchMonth, fetchYear, startDates } from "../globals";
import { fetchJourneys } from "./fetchJourneys";
import fetchJourneyDateRangeLengths from "./fetchJourneyDateRangeLengths";
import fetchJourneyDateRanges from "./fetchJourneyDateRanges";
import sortDateRanges from "./sortDateRanges";
import { FetchRowDataProps } from "./types";
import processLocations from "./locationProcessing";

const fetchCurrentUserLocations = async ({
  currentMonth,
  currentYear,
}: FetchRowDataProps): Promise<string[]> => {
  const endDates: number[] = [];
  let startFromFirstIndex: boolean = false;
  const journeyDateRanges = await fetchJourneyDateRanges({
    currentMonth,
    currentYear,
  });

  const journeys: Journey[] = await fetchJourneys();

  const filteredJourneysSet = new Set(
    journeys.filter((journey) => typeof journey !== "string")
  );

  const filteredJourneys = [...filteredJourneysSet];

  const currentMonthJourneys = filteredJourneys.filter((journey) => {
    const { start, end } = journey.dateRange;
    return (
      fetchMonth(start) === currentMonth || fetchMonth(end) === currentMonth
    );
  });

  const currentMonthAndYearJourneys = currentMonthJourneys.filter((journey) => {
    const { start, end } = journey.dateRange;
    return fetchYear(start) === currentYear || fetchYear(end) === currentYear;
  });

  if (currentMonthAndYearJourneys.length > 1) {
    sortDateRanges(currentMonthAndYearJourneys);
  }

  const dateRangeLengths = await fetchJourneyDateRangeLengths({
    currentMonth,
    currentYear,
  });

  const fetchStartDates = () => {
    journeyDateRanges.forEach(({ start }) => {
      startDates.push(start.getDate());
    });
  };

  const fetchEndDates = () => {
    journeyDateRanges.forEach(({ end }) => {
      endDates.push(end.getDate());
    });
  };

  fetchStartDates();
  fetchEndDates();

  const multipleMonthDateRanges = journeyDateRanges.filter(
    ({ start, end }: DateRange) =>
      start && end ? start.getMonth() !== end.getMonth() : null
  );

  const multipleMonthDateRangeDays: Date[] = multipleMonthDateRanges
    .map(({ start, end }) => eachDayOfInterval({ start, end }))
    .flat();

  const lastDayOfPreviousMonth = new Date(
    currentYear,
    currentMonth,
    0
  ).getDate();

  if (multipleMonthDateRangeDays.length > 0) {
    const hasCurrentMonthFirstDay = multipleMonthDateRangeDays.some(
      (day) => day.getDate() === 1 && day.getMonth() === currentMonth
    );
    const hasLastMonthLastDay = multipleMonthDateRangeDays.some(
      (day) =>
        day.getDate() === lastDayOfPreviousMonth &&
        day.getMonth() === currentMonth - 1
    );
    startFromFirstIndex = hasCurrentMonthFirstDay && hasLastMonthLastDay;
  }

  const locations = processLocations(
    currentMonthAndYearJourneys,
    dateRangeLengths
  );

  console.log("Locations: ", locations);
  return locations;
};

export default fetchCurrentUserLocations;
