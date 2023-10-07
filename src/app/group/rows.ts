import { months } from "./columns";
import { Row } from "../group/types";

import fetchCurrentUserDisplayName from "./fetchCurrentUserDisplayName";
import fetchCurrentUserJourneys from "./fetchCurrentUserJourneys";
import fetchJourneyDateRanges from "./fetchJourneyDateRanges";

const fetchRows = async () => {
  const currentUserDisplayName: string = await fetchCurrentUserDisplayName();
  const currentUserJourneys: string[] = await fetchCurrentUserJourneys();
  const journeyDateRanges = await fetchJourneyDateRanges();
  const currentMonth: number = journeyDateRanges[0].start.getMonth();
  const currentYear: number = journeyDateRanges[0].start.getFullYear();

  const rows: Row[] = [
    {
      id: 1,
      name: currentUserDisplayName,
      month: months[currentMonth],
      year: currentYear,
      locations: currentUserJourneys,
    },
  ];

  return rows;
};

export default fetchRows;
