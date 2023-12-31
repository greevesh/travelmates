import { startDates } from "../globals";
import generateRowData from "./generateRowData";
import {
  ProcessLocationsParams,
  GroupMemberRow,
  MemberJourneys,
} from "./types";

const processLocations = ({
  filteredJourneys,
  dateRangeLengths,
  currentMonth,
  currentYear,
}: ProcessLocationsParams): string[] => {
  const locations: string[] = [];

  const groupMemberRows = generateRowData(filteredJourneys);

  console.log("Group Member Rows: ", groupMemberRows);

  let lengthIndex: number = 0;
  let journeyIndex: number = 0;
  let startDateIndex: number = 0;
  let startFromColumnOne: boolean = false;

  const handleEmptySlots = (startDay: number) => {
    if (startDateIndex === 0) {
      for (let i = 0; i < startDay; i++) {
        locations.push("");
      }
    } else if (dateRangeLengths.length > 1) {
      const previousEnd =
        startDates[startDateIndex - 1] + dateRangeLengths[lengthIndex - 1];

      // Check if the end of the previous journey is the day before the start of the current journey
      if (previousEnd < startDay - 1) {
        // Add empty slots if there is at least one day between the two journeys
        console.log(startDates[startDateIndex]);
        // locations.length = 0;
        for (
          let i = startDates[startDateIndex - 1];
          i < startDates[startDateIndex];
          i++
        ) {
          locations.push("");
        }
      }
    }

    return startDay;
  };

  for (let i = 0; i < dateRangeLengths.length; i++) {
    const startDay: number = handleEmptySlots(startDates[startDateIndex]);
    const endDay: number = startDay + dateRangeLengths[lengthIndex];
    const lastDay = new Date(currentYear, currentMonth + 1, 0);

    if (filteredJourneys.length > 0) {
      let daysLeft: number = 0;
      for (let j = startDay; j <= endDay; j++) {
        // If the end day exceeds the final day of the current month, store the remaining
        // days for the next months
        if (j > lastDay.getDate()) {
          for (let k = j + 1; k <= endDay; k++) {
            daysLeft++;
          }
          break;
        }
        locations.push(filteredJourneys[journeyIndex]?.location || "");
      }
      // If a journey is continuing to span from the previous month onto the current one,
      // start from column one
      if (daysLeft > 0 && startDateIndex === 0) {
        startFromColumnOne = true;
      }
      if (startFromColumnOne) {
        locations.length = 0;
        for (let j = 0; j <= daysLeft; j++) {
          locations.push(filteredJourneys[journeyIndex]?.location || "");
        }
      }
    }
    // Takes care of empty days after the last journey of the row
    if (
      dateRangeLengths.indexOf(dateRangeLengths[lengthIndex]) ===
      dateRangeLengths.length - 1
    ) {
      for (let i = endDay; i < lastDay.getDate(); i++) {
        locations.push("");
      }
    }
    lengthIndex++;
    journeyIndex++;
    startDateIndex++;
  }

  // Reset startDates array once the current month has changed
  startDates.length = 0;

  console.log("Filtered Journeys: ", filteredJourneys);
  console.log("Locations: ", locations);
  return locations;
};

export default processLocations;
