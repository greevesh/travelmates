import {
  query,
  collection,
  getDocs,
  type Query,
  type QuerySnapshot,
} from "firebase/firestore";
import fetchJourneyDateRangeLengths from "./fetchJourneyDateRangeLengths";
import fetchJourneyDateRanges from "./fetchJourneyDateRanges";
import { db } from "../../../firebase/app";
import sortDateRanges from "./sortDateRanges";
import { Journey } from "../create-journey/types";
import { FetchRowDataProps } from "./types";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import { fetchMonth, fetchYear } from "../globals";

const fetchCurrentUserLocations = async ({
  currentMonth,
  currentYear,
}: FetchRowDataProps) => {
  const journeys: Journey[] = [];
  const filteredLocations: string[] = [];
  const startDates: number[] = [];
  const endDates: number[] = [];
  let startFromFirstIndex: boolean = false;

  const q: Query<Document> = query(
    collection(db, "journeys")
    // where("userID", "==", currentUserID)
  );

  const journeysSnapshot: QuerySnapshot<unknown> = await getDocs(q);
  const journeyDateRanges = await fetchJourneyDateRanges({
    currentMonth,
    currentYear,
  });

  if (journeysSnapshot.size > 0) {
    journeysSnapshot.forEach((doc) => {
      const journey = doc.data();
      for (let i = 0; i <= journey.location.length; i++) {
        journeys.push(journey);
      }
    });
  }

  const filteredJourneysSet = new Set(
    journeys.filter((journey) => typeof journey !== "string")
  );

  let filteredJourneys = [...filteredJourneysSet];

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

  currentMonthAndYearJourneys.length > 1
    ? sortDateRanges(currentMonthAndYearJourneys)
    : null;

  const dateRangeLengths = await fetchJourneyDateRangeLengths({
    currentMonth,
    currentYear,
  });

  const fetchStartDates = () => {
    journeyDateRanges.forEach((range) => {
      startDates.push(range.start.getDate());
    });
  };

  const fetchEndDates = () => {
    journeyDateRanges.forEach((range) => {
      endDates.push(range.end.getDate());
    });
  };

  fetchStartDates();
  fetchEndDates();

  const multipleMonthDateRanges = journeyDateRanges.filter((jdr) => {
    return jdr.start.getMonth() !== jdr.end.getMonth();
  });

  const multipleMonthDateRangeDays: Date[] = multipleMonthDateRanges
    .map((dateRange) =>
      eachDayOfInterval({ start: dateRange.start, end: dateRange.end })
    )
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
    hasCurrentMonthFirstDay && hasLastMonthLastDay
      ? (startFromFirstIndex = true)
      : null;
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

        // Check if the end of the previous journey is the day before the start of the current journey
        if (previousEnd < journeyStartDay - 1) {
          // Add empty slots if there is at least one day between the two journeys
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
          filteredLocations.push(
            currentMonthAndYearJourneys[journeyIndex].location
          );
        }
        if (startFromFirstIndex) {
          filteredLocations.length = 0;
          for (let j = 0; j <= daysLeft; j++) {
            filteredLocations.push(
              currentMonthAndYearJourneys[journeyIndex].location
            );
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
