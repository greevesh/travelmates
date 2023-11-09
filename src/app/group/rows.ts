import { DocumentData } from "@firebase/firestore";
import { months } from "./columns";

import fetchJourneyLocations from "./fetch/fetchJourneyLocations";
import { FetchRowDataParams } from "../group/types";
import fetchGroupMembers from "./fetch/fetchGroupMembers";
import filterJourneys from "./filterJourneys";
import { fetchJourneys } from "./fetch/fetchJourneys";

const fetchRows = async ({ currentMonth, currentYear }: FetchRowDataParams) => {
  const groupMembers = await fetchGroupMembers();
  const journeys = await fetchJourneys();
  const filteredJourneys = await filterJourneys(
    journeys,
    currentMonth,
    currentYear
  );
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
      locations: filteredJourneys
        .filter((journey) => journey.userID === member.id)
        .flatMap((journey) =>
          locations.filter(
            (location) => location === journey.location || location === ""
          )
        ),
    };
  });
  return rows;
};

export default fetchRows;
