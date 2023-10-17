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
import { Journey } from "../create-journey/types";

const fetchCurrentUserLocations = async () => {
  const journeys: Journey[] = [];
  const filteredLocations: string[] = [];
  const startDates: number[] = [];

  const q: Query<Document> = query(
    collection(db, "journeys")
    // where("userID", "==", currentUserID)
  );

  const journeysSnapshot: QuerySnapshot<unknown> = await getDocs(q);
  const journeyDateRanges = await fetchJourneyDateRanges();

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

  const filteredJourneys = [...filteredJourneysSet];

  filteredJourneys.sort((a, b) => {
    const dateA =
      a.dateRange.start instanceof Date
        ? a.dateRange.start.getTime()
        : a.dateRange.start || 0;

    const dateB =
      b.dateRange.start instanceof Date
        ? b.dateRange.start.getTime()
        : b.dateRange.start || 0;

    return dateA - dateB;
  });

  const dateRangeLengths = await fetchJourneyDateRangeLengths();

  const fetchStartDates = () => {
    journeyDateRanges.forEach((range) => {
      startDates.push(range.start.getDate());
    });
  };

  const mapLocationToDateRangeLength = () => {
    let lengthIndex: number = 0;
    let journeyIndex: number = 0;
    let startDateIndex: number = 0;

    const runFirstLoop = () => {
      const journeyStartDay: number = startDates[startDateIndex];

      if (startDateIndex === 0) {
        for (let i = 0; i < journeyStartDay; i++) {
          filteredLocations.push("");
        }
      } else {
        for (
          let i =
            startDates[startDateIndex - 1] + dateRangeLengths[lengthIndex - 1];
          i < journeyStartDay;
          i++
        ) {
          filteredLocations.push("");
        }
      }

      startDateIndex++;
      return journeyStartDay;
    };

    for (let i = 0; i < dateRangeLengths.length; i++) {
      const journeyStartDay: number = runFirstLoop();

      for (
        let j = journeyStartDay;
        j < journeyStartDay + dateRangeLengths[lengthIndex];
        j++
      ) {
        filteredLocations.push(filteredJourneys[journeyIndex].location);
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
