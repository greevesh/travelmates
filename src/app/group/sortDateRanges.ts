import { Journey, JourneyLength } from "../create-journey/types";

const isJourneys = (
  journeys: Journey[] | JourneyLength[]
): journeys is Journey[] => {
  return (
    Array.isArray(journeys) && typeof journeys[0]?.dateRange !== "undefined"
  );
};

const sortDateRanges = (arr: Journey[] | JourneyLength[]) => {
  // If arr of journeys no need to reference journey obj
  if (isJourneys(arr)) {
    arr.sort((a, b) => {
      const dateA =
        a.dateRange.start instanceof Date
          ? a.dateRange.start.getTime()
          : a.dateRange.start || 0;

      const dateB =
        b.dateRange.start instanceof Date
          ? b.dateRange.start.getTime()
          : b.dateRange.start || 0;

      return dateA - dateB;
    });
  }
  // If arr of journey lengths reference journey obj
  else {
    arr.sort((a, b) => {
      const dateA =
        a.journey.dateRange.start instanceof Date
          ? a.journey.dateRange.start.getTime()
          : a.journey.dateRange.start || 0;

      const dateB =
        b.journey.dateRange.start instanceof Date
          ? b.journey.dateRange.start.getTime()
          : b.journey.dateRange.start || 0;

      return dateA - dateB;
    });
  }
};

export default sortDateRanges;
