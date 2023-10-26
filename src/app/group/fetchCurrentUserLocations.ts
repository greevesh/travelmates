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

const fetchCurrentUserLocations = async ({
  currentMonth,
  currentYear,
}: FetchRowDataProps) => {
  const journeys: Journey[] = [];
  const filteredLocations: string[] = [];
  const startDates: number[] = [];

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

  filteredJourneys = filteredJourneys.filter(
    (journey) =>
      journey.dateRange.start.toDate().getMonth() === currentMonth &&
      journey.dateRange.start.toDate().getFullYear() === currentYear
  );

  filteredJourneys.length > 1 ? sortDateRanges(filteredJourneys) : null;

  const dateRangeLengths = await fetchJourneyDateRangeLengths({
    currentMonth,
    currentYear,
  });

  const fetchStartDates = () => {
    journeyDateRanges.forEach((range) => {
      startDates.push(range.start.getDate());
    });
  };

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
          // Add empty slots if there is a day gap
          for (let i = previousEnd + 1; i < journeyStartDay; i++) {
            filteredLocations.push("");
          }
        }
      }

      startDateIndex++;
      return journeyStartDay;
    };

    for (let i = 0; i < dateRangeLengths.length; i++) {
      const journeyStartDay: number = handleEmptySlots();
      const journeyEndDay: number =
        journeyStartDay + dateRangeLengths[lengthIndex];

      if (filteredJourneys.length > 0) {
        for (let j = journeyStartDay; j <= journeyEndDay; j++) {
          filteredLocations.push(filteredJourneys[journeyIndex].location);
        }
      }
      if (
        dateRangeLengths.indexOf(dateRangeLengths[lengthIndex]) ===
        dateRangeLengths.length - 1
      ) {
        const today = new Date();
        const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
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

  return filteredLocations;
};

export default fetchCurrentUserLocations;
