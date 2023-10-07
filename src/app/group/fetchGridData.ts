import fetchRows from "./rows";
import fetchCurrentUserDisplayName from "./fetchCurrentUserDisplayName";
import fetchCurrentUserJourneys from "./fetchCurrentUserJourneys";
import { generatedColumns } from "./columns";
import { FetchGridDataProps } from "./types";

const fetchGridData = async ({
  setColumns,
  setCurrentMonthRows,
  setUserDisplayName,
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
  } catch (err) {
    console.log("Error: ", err);
  }
};

export default fetchGridData;
