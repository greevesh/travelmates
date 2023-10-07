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

const fetchCurrentUserJourneys = async () => {
  const locations: string[] = [];
  const q: Query<Document> = query(
    collection(db, "journeys")
    // where("userID", "==", currentUserID)
  );

  const journeys: QuerySnapshot<unknown> = await getDocs(q);
  const journeyDateRangeLengths = await fetchJourneyDateRangeLengths();
  const journeyDateRanges = await fetchJourneyDateRanges();
  const journeyStartDay: number = journeyDateRanges[0].start.getDate();

  if (journeys.size > 0) {
    journeys.forEach((doc) => {
      const journey = doc.data();
      for (let i = 0; i < journeyStartDay; i++) {
        locations.push("");
      }
      for (let i = 0; i <= journeyDateRangeLengths[0]; i++) {
        locations.push(journey.location);
      }
    });
  }

  return locations;
};

export default fetchCurrentUserJourneys;
