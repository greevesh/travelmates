import fetchRows from "./rows";
import fetchCurrentUserDisplayName from "./fetchCurrentUserDisplayName";
import fetchCurrentUserJourneys from "./fetchCurrentUserLocations";
import { generatedColumns } from "./columns";
import { FetchGridDataProps } from "./types";

const fetchGridData = async ({
  setColumns,
  setCurrentMonthRows,
  setUserDisplayName,
  setFetchedGridData,
}: FetchGridDataProps): Promise<void> => {
  try {
    const fetchedRows = await fetchRows();
    const displayName = await fetchCurrentUserDisplayName();
    const journeys = await fetchCurrentUserJourneys();

    setColumns(generatedColumns);
    setCurrentMonthRows(
      fetchedRows.map((row) => ({
        ...row,
        name: row.name,
      }))
    );
    setUserDisplayName(displayName);
    setFetchedGridData(true);
  } catch (err) {
    console.log("Error fetching grid data: ", err);
  }
};

export default fetchGridData;
