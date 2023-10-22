import fetchRows from "./rows";
import fetchCurrentUserDisplayName from "./fetchCurrentUserDisplayName";
import fetchCurrentUserJourneys from "./fetchCurrentUserLocations";
import { RenderRowsProps } from "./types";

const renderRows = async ({
  setCurrentMonthRows,
  setUserDisplayName,
  setFetchedRows,
}: RenderRowsProps): Promise<void> => {
  try {
    const fetchedRows = await fetchRows();
    const displayName = await fetchCurrentUserDisplayName();
    const journeys = await fetchCurrentUserJourneys();

    setCurrentMonthRows(
      fetchedRows.map((row) => ({
        ...row,
        name: row.name,
      }))
    );
    setUserDisplayName(displayName);
    setFetchedRows(true);
  } catch (err) {
    console.log("Error Fetching Row Data: ", err);
  }
};

export default renderRows;
