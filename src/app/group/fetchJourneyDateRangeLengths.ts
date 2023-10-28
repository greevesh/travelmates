import {
  query,
  collection,
  getDocs,
  type Query,
  type QuerySnapshot,
} from "firebase/firestore";
import { db } from "../../../firebase/app";
import formatDate from "../create-journey/formatDate";
import sortDateRanges from "./sortDateRanges";
import { fetchMonth, fetchYear } from "../globals";
import { Journey } from "../create-journey/types";
import { FetchRowDataProps } from "./types";

const fetchJourneyDateRangeLengths = async ({
  currentMonth,
  currentYear,
}: FetchRowDataProps) => {
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

  const currentMonthDateRangeLengths = journeyLengths.filter(
    (dateRangeLength) => {
      const { start, end } = dateRangeLength.journey.dateRange;
      return (
        fetchMonth(start) === currentMonth || fetchMonth(end) === currentMonth
      );
    }
  );

  const currentMonthAndYearDateRangeLengths =
    currentMonthDateRangeLengths.filter((dateRangeLength) => {
      const { start, end } = dateRangeLength.journey.dateRange;
      return fetchYear(start) === currentYear || fetchYear(end) === currentYear;
    });

  currentMonthAndYearDateRangeLengths.length > 1
    ? sortDateRanges(currentMonthAndYearDateRangeLengths)
    : null;

  currentMonthAndYearDateRangeLengths.map((journeyLength) => {
    dateRangeLengths.push(journeyLength.length);
  });

  return dateRangeLengths;
};

export default fetchJourneyDateRangeLengths;
