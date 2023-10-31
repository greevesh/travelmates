import { GridColDef, GridCellParams } from "@mui/x-data-grid";
import { Months } from "../group/types";

export const slotColumnCommonFields: Partial<GridColDef> = {
  cellClassName: (params) => params.value,
  colSpan: ({ row, field, value }: GridCellParams) => {
    const index: number = Number(field);
    let colSpan: number = 1;
    for (let i = index + 1; i < row.locations.length; i += 1) {
      const nextValue: string = row.locations[i];
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
