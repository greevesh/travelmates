import { months } from "./columns";
import { Row } from "../group/types";

import fetchCurrentUserDisplayName from "./fetchCurrentUserDisplayName";
import fetchCurrentUserLocations from "./fetchCurrentUserLocations";
import fetchJourneyDateRanges from "./fetchJourneyDateRanges";

const fetchRows = async () => {
  const currentUserDisplayName: string = await fetchCurrentUserDisplayName();
  const currentUserLocations: string[] = await fetchCurrentUserLocations();
  const journeyDateRanges = await fetchJourneyDateRanges();
  const currentMonth: number = journeyDateRanges[0].start.getMonth();
  const currentYear: number = journeyDateRanges[0].start.getFullYear();

  const rows: Row[] = [
    {
      id: 1,
      name: currentUserDisplayName,
      month: months[currentMonth],
      year: currentYear,
      locations: currentUserLocations,
    },
  ];

  console.log("Current user locations: ", currentUserLocations);
  console.log("Journey date ranges: ", journeyDateRanges);
  return rows;
};

export default fetchRows;
