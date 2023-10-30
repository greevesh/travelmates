import eachDayOfInterval from "date-fns/eachDayOfInterval";
import { Journey, DateRange } from "../create-journey/types";
import { fetchMonth, fetchYear, startDates } from "../globals";
import { fetchJourneys } from "./fetchJourneys";
import fetchJourneyDateRangeLengths from "./fetchJourneyDateRangeLengths";
import fetchJourneyDateRanges from "./fetchJourneyDateRanges";
import sortDateRanges from "./sortDateRanges";
import processLocations from "./locationProcessing";
import filterJourneysByMonthAndYear from "./filterJourneys";
import { FetchRowDataProps } from "./types";

const fetchCurrentUserLocations = async ({
  currentMonth,
  currentYear,
}: FetchRowDataProps): Promise<string[]> => {
  const endDates: number[] = [];
  let startFromFirstIndex: boolean = false;

  const journeys: Journey[] = await fetchJourneys();

  const filterJourneys = filterJourneysByMonthAndYear();

  const filteredJourneys = filterJourneys(journeys, currentMonth, currentYear);

  if (filteredJourneys.length > 1) {
    sortDateRanges(filteredJourneys);
  }

  const journeyDateRanges = await fetchJourneyDateRanges({
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

  const dateRangeLengths = await fetchJourneyDateRangeLengths({
    currentMonth,
    currentYear,
  });

  const locations = processLocations(filteredJourneys, dateRangeLengths);

  console.log("Locations: ", locations);
  return locations;
};

export default fetchCurrentUserLocations;
