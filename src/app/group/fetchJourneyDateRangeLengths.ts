import {
  query,
  collection,
  getDocs,
  type Query,
  type QuerySnapshot,
} from "firebase/firestore";
import { db } from "../../../firebase/app";
import formatDate from "../create-journey/formatDate";
import { Journey } from "../create-journey/types";
import sortDateRanges from "./sortDateRanges";

const fetchJourneyDateRangeLengths = async () => {
  const journeys: Journey[] = [];
  const journeyLengths: { journey: Journey; length: number }[] = [];
  const dateRangeLengths: number[] = [];
  const q: Query<Document> = query(collection(db, "journeys"));

  const journeysSnapshot: QuerySnapshot<unknown> = await getDocs(q);

  if (journeysSnapshot.size > 0) {
    journeysSnapshot.forEach((doc) => {
      const journey = doc.data();
      const { start, end } = journey.dateRange;
      const startDate: Date = formatDate(start.seconds);
      const endDate: Date = formatDate(end.seconds);
      const daysInBetween: number = endDate - startDate;
      const formattedDays = Math.floor(daysInBetween / (24 * 60 * 60 * 1000));
      journeys.push(journey);
      journeyLengths.push({ journey, length: formattedDays });
    });
  }

  const filteredJourneysSet = new Set(
    journeys.filter((journey) => typeof journey !== "string")
  );

  console.log("Journeys: ", journeys);
  console.log("Unordered filtered journeys set: ", filteredJourneysSet);

  sortDateRanges(journeyLengths);

  journeyLengths.forEach((journey) => {
    dateRangeLengths.push(journey.length);
  });

  console.log("Ordered journey data: ", journeyLengths);
  console.log("Ordered lengths: ", dateRangeLengths);
  return dateRangeLengths;
};

export default fetchJourneyDateRangeLengths;
