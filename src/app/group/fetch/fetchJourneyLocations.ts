import { fetchJourneys } from "./fetchJourneys";
import fetchJourneyDateRangeLengths from "./fetchDateRangeLengths";
import fetchJourneyDateRanges from "./fetchDateRanges";
import processDateRanges from "../processDateRanges";
import sortDateRanges from "../sortDateRanges";
import processLocations from "../processLocations";
import filterJourneys from "../filterJourneys";
import { FetchRowDataParams } from "../types";
import { Journey } from "../../create-journey/types";

const fetchJourneyLocations = async ({
  currentMonth,
  currentYear,
}: FetchRowDataParams): Promise<string[]> => {
  const journeys: Journey[] = await fetchJourneys();

  const filteredJourneys: Journey[] = await filterJourneys(
    journeys,
    currentMonth,
    currentYear
  );

  if (filteredJourneys.length > 1) {
    sortDateRanges(filteredJourneys);
  }

  const journeyDateRanges = await fetchJourneyDateRanges({
    currentMonth,
    currentYear,
  });

  processDateRanges(journeyDateRanges, currentMonth, currentYear);

  const dateRangeLengths = await fetchJourneyDateRangeLengths({
    currentMonth,
    currentYear,
  });

  const locations = processLocations({
    filteredJourneys,
    dateRangeLengths,
    currentMonth,
    currentYear,
  });

  return locations;
};

export default fetchJourneyLocations;
