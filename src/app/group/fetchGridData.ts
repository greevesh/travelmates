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
};

export default fetchGridData;
