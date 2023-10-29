import {
  query,
  collection,
  getDocs,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "../../../firebase/app";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import { Journey, DateRange } from "../create-journey/types";
import { fetchMonth, fetchYear } from "../globals";
import fetchJourneyDateRangeLengths from "./fetchJourneyDateRangeLengths";
import fetchJourneyDateRanges from "./fetchJourneyDateRanges";
import sortDateRanges from "./sortDateRanges";
import { FetchRowDataProps } from "./types";

const fetchCurrentUserLocations = async ({
  currentMonth,
  currentYear,
}: FetchRowDataProps): Promise<string[]> => {
  const journeys: Journey[] = [];
  const filteredLocations: string[] = [];
  const startDates: number[] = [];
  const endDates: number[] = [];
  let startFromFirstIndex: boolean = false;

  const journeysCollection = collection(db, "journeys");
  const journeysSnapshot: QuerySnapshot<QueryDocumentSnapshot<Journey>> =
    await getDocs(query(journeysCollection));

  const journeyDateRanges = await fetchJourneyDateRanges({
    currentMonth,
    currentYear,
  });

  if (journeysSnapshot.size > 0) {
    journeysSnapshot.forEach((doc) => {
      journeys.push(doc.data());
    });
  }

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

  const mapLocationToDateRangeLength = () => {
    let lengthIndex: number = 0;
    let journeyIndex: number = 0;
    let startDateIndex: number = 0;

    const handleEmptySlots = () => {
      const journeyStartDay: number = startDates[startDateIndex];

      if (startDateIndex === 0) {
        for (let i = 0; i < journeyStartDay; i++) {
          filteredLocations.push("");
        }
      } else if (dateRangeLengths.length > 1) {
        const previousEnd =
          startDates[startDateIndex - 1] + dateRangeLengths[lengthIndex - 1];

        if (previousEnd < journeyStartDay - 1) {
          for (let i = previousEnd + 1; i < journeyStartDay; i++) {
            filteredLocations.push("");
          }
        }
      }

      startDateIndex++;
      return journeyStartDay;
    };

    for (let i = 0; i < dateRangeLengths.length; i++) {
      let journeyStartDay: number = handleEmptySlots();
      const journeyEndDay: number =
        journeyStartDay + dateRangeLengths[lengthIndex];
      const lastDay = new Date(currentYear, currentMonth + 1, 0);

      if (currentMonthAndYearJourneys.length > 0) {
        let daysLeft: number = 0;
        for (let j = journeyStartDay; j <= journeyEndDay; j++) {
          if (j > lastDay.getDate()) {
            for (let k = j + 1; k <= journeyEndDay; k++) {
              daysLeft++;
            }
            break;
          }
          const location = currentMonthAndYearJourneys[journeyIndex].location;
          if (location !== undefined) {
            filteredLocations.push(location);
          }
        }
        if (startFromFirstIndex) {
          filteredLocations.length = 0;
          for (let j = 0; j <= daysLeft; j++) {
            const location = currentMonthAndYearJourneys[journeyIndex].location;
            if (location !== undefined) {
              filteredLocations.push(location);
            }
          }
        }
      }
      if (
        dateRangeLengths.indexOf(dateRangeLengths[lengthIndex]) ===
        dateRangeLengths.length - 1
      ) {
        for (let i = journeyEndDay; i < lastDay.getDate(); i++) {
          filteredLocations.push("");
        }
      }
      lengthIndex++;
      journeyIndex++;
    }
  };

  fetchStartDates();
  mapLocationToDateRangeLength();

  console.log("Locations: ", filteredLocations);
  return filteredLocations;
};

export default fetchCurrentUserLocations;
