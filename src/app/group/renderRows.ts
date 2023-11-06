import fetchRows from "./rows";
import fetchCurrentUserDisplayName from "./fetchCurrentUserDisplayName";
import { RenderRowsParams } from "./types";

const renderRows = async ({
  setCurrentMonthRows,
  setCurrentUserDisplayName,
  setFetchedRows,
  currentMonth,
  currentYear,
}: RenderRowsParams): Promise<void> => {
  try {
    const fetchedRows = await fetchRows({ currentMonth, currentYear });
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
