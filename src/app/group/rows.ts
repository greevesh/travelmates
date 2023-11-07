import { DocumentData } from "@firebase/firestore";
import { months } from "./columns";

import fetchCurrentUserLocations from "./fetch/fetchLocations";
import { FetchRowDataParams } from "../group/types";
import fetchGroupMembers from "./fetch/fetchGroupMembers";

const fetchRows = async ({ currentMonth, currentYear }: FetchRowDataParams) => {
  const groupMembers = await fetchGroupMembers();
  const currentUserLocations: string[] = await fetchCurrentUserLocations({
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
      locations: currentUserLocations,
    };
  });

  return rows;
};

export default fetchRows;
