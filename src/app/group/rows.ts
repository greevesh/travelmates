import { months } from "./columns";
import { Row } from "../group/types";

import fetchCurrentUserDisplayName from "./fetchCurrentUserDisplayName";
import fetchCurrentUserJourneys from "./fetchCurrentUserJourneys";
import fetchJourneyDateRanges from "./fetchJourneyDateRanges";
import fetchJourneyDateRangeLengths from "./fetchJourneyDateRangeLengths";

const fetchRows = async () => {
  const currentUserDisplayName: string = await fetchCurrentUserDisplayName();
  const currentUserJourneys: string[] = await fetchCurrentUserJourneys();
  const currentDateRangeLengths: number[] =
    await fetchJourneyDateRangeLengths();
  console.log("Current date range lengths:", currentDateRangeLengths);
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
    {
      id: 2,
      name: "Myo",
      month: "October",
      year: 2023,
      locations: ["Taipei (TW)", "Taipei (TW)", "Taipei (TW)", "Taipei (TW)"],
    },
  ];

  return rows;
};

export default fetchRows;
