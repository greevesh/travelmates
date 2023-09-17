import { GridColDef, GridCellParams } from "@mui/x-data-grid";
import { Months } from "../../../src/app/types";

export const slotColumnCommonFields: Partial<GridColDef> = {
  maxWidth: 10,
  cellClassName: (params) => params.value,
  colSpan: ({ row, field, value }: GridCellParams) => {
    const index: number = Number(field);
    let colSpan: number = 1;
    for (let i = index + 1; i < row.places.length; i += 1) {
      const nextValue: string = row.places[i];
      if (nextValue === value) {
        colSpan += 1;
      } else {
        break;
      }
    }
    return colSpan;
  },
};

export const months: Months[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const generatedColumns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
  },
];
