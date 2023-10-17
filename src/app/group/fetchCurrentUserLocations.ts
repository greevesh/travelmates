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
  const locations: string[] = [];
  const filteredLocations: string[] = [];
  const startDates: number[] = [];

  const q: Query<Document> = query(
    collection(db, "journeys")
    // where("userID", "==", currentUserID)
  );

  const journeysSnapshot: QuerySnapshot<unknown> = await getDocs(q);
  const journeyDateRangeLengths = await fetchJourneyDateRangeLengths();
  const journeyDateRanges = await fetchJourneyDateRanges();
  // const journeyStartDay: number = journeyDateRanges[0].start.getDate();

  if (journeysSnapshot.size > 0) {
    journeysSnapshot.forEach((doc) => {
      const journey = doc.data();
      // for (let i = 0; i < journeyStartDay; i++) {
      //   filteredLocations.push("");
      // }
      for (let i = 0; i <= journey.location.length; i++) {
        // locations.push(journey.location);
        journeys.push(journey);
        // console.log("Journey start day: ", journeyStartDay);
      }
    });
  }

  const filteredJourneysSet = new Set(
    journeys.filter((journey) => typeof journey !== "string")
  );

  console.log("Filtered Journeys Set: ", filteredJourneysSet);

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

  console.log("Ordered filtered journeys: ", filteredJourneys);

  const dateRangeLengths = await fetchJourneyDateRangeLengths();
  console.log("Date Range Lengths: ", dateRangeLengths);

  const fetchStartDates = () => {
    journeyDateRanges.forEach((range) => {
      startDates.push(range.start.getDate());
    });
  };

  const handleEmptyColumns = () => {
    let index: number = 0;
    const journeyStartDay: number = startDates[index];
    for (let i = 0; i < journeyStartDay; i++) {
      filteredLocations.push("");
    }
    // index++;
    // for (let i = 0; i < startDates[index] - startDates[index] - 1; i++) {
    //   filteredLocations.push("");
    // }
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
          console.log(journeyStartDay - 1);
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

      console.log("Journey Start Day: ", journeyStartDay);
      lengthIndex++;
      journeyIndex++;
    }
  };

  fetchStartDates();
  // handleEmptyColumns();
  mapLocationToDateRangeLength();

  console.log("Locations: ", locations);
  console.log("Filtered Locations: ", filteredLocations);
  console.log("Start Dates: ", startDates);
  return filteredLocations;
};

export default fetchCurrentUserLocations;
