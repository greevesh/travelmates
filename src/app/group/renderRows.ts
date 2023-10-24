import fetchRows from "./rows";
import fetchCurrentUserDisplayName from "./fetchCurrentUserDisplayName";
import { RenderRowsProps } from "./types";

const renderRows = async ({
  setCurrentMonthRows,
  setCurrentUserDisplayName,
  setFetchedRows,
  currentMonth,
}: RenderRowsProps): Promise<void> => {
  try {
    const fetchedRows = await fetchRows({ currentMonth });
    const displayName = await fetchCurrentUserDisplayName();

    setCurrentMonthRows(
      fetchedRows.map((row) => ({
        ...row,
        name: row.name,
      }))
    );
    setCurrentUserDisplayName(displayName);
    setFetchedRows(true);
  } catch (err) {
    console.log("Error Fetching Row Data: ", err);
  }
};

export default renderRows;
