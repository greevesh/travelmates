import { Journey } from "../create-journey/types";
import { GroupMemberRow } from "./types";

const generateRowData = (journeys: Journey[]) => {
  const groupMemberRows: GroupMemberRow[] = [];

  journeys.forEach((journey) => {
    const existingMemberRow = groupMemberRows.find(
      (groupedJourney) => groupedJourney.memberId === journey.userID
    );

    if (existingMemberRow) {
      existingMemberRow.journeys.push(journey);
    } else {
      groupMemberRows.push({ memberId: journey.userID, journeys: [journey] });
    }
  });

  return groupMemberRows;
};

export default generateRowData;
