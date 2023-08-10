import generateCalendar from "./generateCalendar";
import { GridColDef, GridCellParams } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
  },
];

export const slotColumnCommonFields: Partial<GridColDef> = {
  maxWidth: 10,
  cellClassName: (params) => params.value,
  colSpan: ({ row, field, value }: GridCellParams) => {
    const index = Number(field);
    let colSpan = 1;
    for (let i = index + 1; i < row.slots.length; i += 1) {
      const nextValue = row.slots[i];
      if (nextValue === value) {
        colSpan += 1;
      } else {
        break;
      }
    }
    return colSpan;
  },
};

export default columns;
