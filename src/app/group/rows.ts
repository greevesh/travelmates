import {
  getDocs,
  query,
  collection,
  where,
  type QuerySnapshot,
  type Query,
} from "firebase/firestore";
import { db } from "../../../firebase/app";
import formatDate from "../create-journey/formatDate";
import { months } from "./columns";
import { Journey } from "../create-journey/types";
import { Row } from "../group/types";

import { currentUserID } from "../globals";
import fetchCurrentUserDisplayName from "./fetchCurrentUserDisplayName";

// async function fetchUserDisplayName() {
//   const q: Query<Document> = query(
//     collection(db, "users"),
//     where("id", "==", currentUserID)
//   );
//   const querySnapshot: QuerySnapshot<unknown> = await getDocs(q);

//   if (querySnapshot.size === 1) {
//     const user = querySnapshot.docs[0].data();
//     return user.displayName;
//   } else {
//     return "N/A";
//   }
// }

export const fetchCurrentUserJourneys = async () => {
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

export const fetchJourneyDateRanges = async (journey?: Journey) => {
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

  return dateRanges;
};

export const fetchJourneyDateRangeLengths = async () => {
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

async function fetchRows() {
  const currentUserDisplayName: string = await fetchCurrentUserDisplayName();
  const currentUserJourneys: string[] = await fetchCurrentUserJourneys();
  const currentDateRangeLengths: number[] =
    await fetchJourneyDateRangeLengths();
  console.log("Current date range lengths:", currentDateRangeLengths);
  const journeyDateRanges = await fetchJourneyDateRanges();
  const currentMonth: number = journeyDateRanges[0].start.getMonth();
  const currentYear: number = journeyDateRanges[0].start.getFullYear();
  console.log("Current year:", currentYear);
  console.log("Current user journeys:", currentUserJourneys);
  console.log(
    "Journey start day number:",
    journeyDateRanges[0].start.getDate()
  );

  const rows: Row[] = [
    {
      id: 1,
      name: currentUserDisplayName,
      month: months[currentMonth],
      year: currentYear,
      locations: currentUserJourneys,
    },
    {
      id: 2,
      name: "Myo",
      month: "October",
      year: 2023,
      locations: ["Taipei (TW)", "Taipei (TW)", "Taipei (TW)", "Taipei (TW)"],
    },
  ];

  return rows;
}

export default fetchRows;
