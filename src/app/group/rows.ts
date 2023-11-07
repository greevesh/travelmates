import { DocumentData } from "@firebase/firestore";
import { months } from "./columns";

import fetchJourneyLocations from "./fetch/fetchJourneyLocations";
import { FetchRowDataParams } from "../group/types";
import fetchGroupMembers from "./fetch/fetchGroupMembers";

const fetchRows = async ({ currentMonth, currentYear }: FetchRowDataParams) => {
  const groupMembers = await fetchGroupMembers();
  const locations: string[] = await fetchJourneyLocations({
    currentMonth,
    currentYear,
  });

  const rows = groupMembers.map((member: DocumentData) => {
    return {
      id: member.id,
      photoUrl: member.photoURL,
      name: member.displayName,
      month: months[currentMonth],
      year: currentYear,
      locations: locations,
    };
  });

  return rows;
};

export default fetchRows;
