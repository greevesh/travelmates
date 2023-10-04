import { Dispatch, SetStateAction } from "react";
import { GridColDef } from "@mui/x-data-grid-pro";
import fetchRows from "./rows";
import getCurrentUserDisplayName from "./getCurrentUserDisplayName";
import { fetchCurrentUserJourneys } from "./rows";
import { generatedColumns } from "./columns";
import { Row } from "./types";

interface FetchGridDataProps {
  setColumns: Dispatch<SetStateAction<GridColDef[]>>;
  setCurrentMonthRows: Dispatch<SetStateAction<Row[]>>;
  setUserDisplayName: Dispatch<SetStateAction<string | null>>;
}

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
