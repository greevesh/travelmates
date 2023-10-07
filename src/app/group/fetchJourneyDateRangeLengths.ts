import {
  query,
  collection,
  getDocs,
  type Query,
  type QuerySnapshot,
} from "firebase/firestore";
import { db } from "../../../firebase/app";
import formatDate from "../create-journey/formatDate";

const fetchJourneyDateRangeLengths = async () => {
  const dateRangeLengths: number[] = [];
  const q: Query<Document> = query(collection(db, "journeys"));

  const journeys: QuerySnapshot<unknown> = await getDocs(q);

  if (journeys.size > 0) {
    journeys.forEach((doc) => {
      const journey = doc.data();
      const { start, end } = journey.dateRange;
      const startDate: Date = formatDate(start.seconds);
      const endDate: Date = formatDate(end.seconds);
      const daysInBetween: number = endDate - startDate;
      const formattedDays = Math.floor(daysInBetween / (24 * 60 * 60 * 1000));
      dateRangeLengths.push(formattedDays);
    });
  }

  return dateRangeLengths;
};

export default fetchJourneyDateRangeLengths;
