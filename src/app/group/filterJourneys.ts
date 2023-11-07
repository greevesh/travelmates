/* eslint-disable indent */
import { DocumentData } from "firebase/firestore";
import { fetchMonth, fetchYear } from "../globals";
import { Journey } from "../create-journey/types";
import fetchGroupMemberships from "./fetch/fetchGroupMemberships";

const filterJourneys = async (
  journeys: Journey[],
  currentMonth: number,
  currentYear: number
): Promise<Journey[]> => {
  try {
    const groupMemberships: DocumentData[] = await fetchGroupMemberships();
    const groupMemberIds = groupMemberships.map(
      (membership: DocumentData) => membership.userID
    );

    const journeysSet = new Set(
      journeys.filter((journey) => typeof journey !== "string")
    );

    let filteredJourneys = [...journeysSet];

    // Filter journeys that have been created by group members
    filteredJourneys = filteredJourneys.filter((journey) =>
      groupMemberIds.includes(journey.userID)
    );

    console.log("Group Memberships: ", groupMemberships);
    console.log("IDs: ", groupMemberIds);
    console.log("Filtered Journeys: ", filteredJourneys);

    filteredJourneys = filteredJourneys.filter((journey) => {
      const { start, end } = journey.dateRange;
      const currentMonthMatch: boolean =
        fetchMonth(start) === currentMonth || fetchMonth(end) === currentMonth;
      const currentYearMatch: boolean =
        fetchYear(start) === currentYear || fetchYear(end) === currentYear;
      return currentMonthMatch && currentYearMatch;
    });

    return filteredJourneys;
  } catch (err) {
    console.log("Error filtering journeys: ", err);
  }
  return [];
};

export default filterJourneys;
