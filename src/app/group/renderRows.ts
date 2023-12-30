import fetchRows from "./rows";
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

    setCurrentMonthRows(
      fetchedRows.map((row) => ({
        ...row,
        name: row.name,
      }))
    );
    setFetchedRows(true);
  } catch (err) {
    console.log("Error Fetching Row Data: ", err);
  }
};

export default renderRows;
