import {
  query,
  collection,
  getDocs,
  type Query,
  type QuerySnapshot,
} from "firebase/firestore";
import { FetchRowDataProps } from "./types";
import formatDate from "../create-journey/formatDate";
import { db } from "../../../firebase/app";

const fetchJourneyDateRanges = async ({ currentMonth }: FetchRowDataProps) => {
  const dateRanges: { start: Date; end: Date }[] = [];
  const q: Query<Document> = query(collection(db, "journeys"));

  const journeys: QuerySnapshot<unknown> = await getDocs(q);

  if (journeys.size > 0) {
    journeys.forEach((doc) => {
      const journey = doc.data();
      const { start, end } = journey.dateRange;
      const startDate: Date = formatDate(start.seconds);
      const endDate: Date = formatDate(end.seconds);
      dateRanges.push({ start: startDate, end: endDate });
    });
  }

  let filteredDateRanges = dateRanges.filter(
    (dateRange) => dateRange.start.getMonth() === currentMonth
  );

  filteredDateRanges.length > 1
    ? filteredDateRanges.sort((a, b) => a.start.getTime() - b.start.getTime())
    : null;

  return filteredDateRanges;
};

export default fetchJourneyDateRanges;
