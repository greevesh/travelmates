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
}: FetchRowDataProps) => {
  const journeys: Journey[] = [];
  const filteredLocations: string[] = [];
  const startDates: number[] = [];

  const q: Query<Document> = query(
    collection(db, "journeys")
    // where("userID", "==", currentUserID)
  );

  const journeysSnapshot: QuerySnapshot<unknown> = await getDocs(q);
  const journeyDateRanges = await fetchJourneyDateRanges({ currentMonth });

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
    (journey) => journey.dateRange.start.toDate().getMonth() === currentMonth
  );

  filteredJourneys.length > 1 ? sortDateRanges(filteredJourneys) : null;

  const dateRangeLengths = await fetchJourneyDateRangeLengths({ currentMonth });

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
      } else {
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

      if (filteredJourneys.length > 0) {
        for (
          let j = journeyStartDay;
          j <= journeyStartDay + dateRangeLengths[lengthIndex];
          j++
        ) {
          filteredLocations.push(filteredJourneys[journeyIndex].location);
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
