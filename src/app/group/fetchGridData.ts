import fetchRows from "./rows";
import getCurrentUserDisplayName from "./getCurrentUserDisplayName";
import { fetchCurrentUserJourneys } from "./rows";
import { generatedColumns } from "./columns";
import { FetchGridDataProps } from "./types";

const fetchGridData = async ({
  setColumns,
  setCurrentMonthRows,
  setUserDisplayName,
}: FetchGridDataProps): Promise<void> => {
  try {
    const fetchedRows = await fetchRows();
    const displayName = await getCurrentUserDisplayName();
    const journeys = await fetchCurrentUserJourneys();

    setColumns(generatedColumns);
    setCurrentMonthRows(
      fetchedRows.map((row) => ({
        ...row,
        name: row.name,
      }))
    );
    setUserDisplayName(displayName);
  } catch (err) {
    console.log("Error: ", "Couldn't retrieve grid data");
  }
};

export default fetchGridData;
