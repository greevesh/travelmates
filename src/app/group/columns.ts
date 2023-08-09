import { GridColDef, GridCellParams } from "@mui/x-data-grid";

const slotDaysLookup = {
  0: "1",
  1: "2",
  2: "3",
  3: "4",
  4: "5",
  5: "6",
  6: "7",
  7: "8",
  8: "9",
  9: "10",
  10: "11",
  11: "12",
  12: "13",
  13: "14",
  14: "15",
  15: "16",
  16: "17",
  17: "18",
  18: "19",
  19: "20",
  20: "21",
  21: "22",
  22: "23",
  23: "24",
  24: "25",
  25: "26",
  26: "27",
  27: "28",
  28: "29",
  29: "30",
};

const slotColumnCommonFields: Partial<GridColDef> = {
  minWidth: 100,
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

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
  },
  {
    field: "0",
    headerName: slotDaysLookup[0],
    valueGetter: ({ row }) => row.slots[0],
    sortable: false,
    ...slotColumnCommonFields,
  },
  {
    field: "1",
    headerName: slotDaysLookup[1],
    valueGetter: ({ row }) => row.slots[1],
    sortable: false,
    ...slotColumnCommonFields,
  },
  {
    field: "2",
    headerName: slotDaysLookup[2],
    valueGetter: ({ row }) => row.slots[2],
    sortable: false,
    ...slotColumnCommonFields,
  },
  {
    field: "3",
    headerName: slotDaysLookup[3],
    valueGetter: ({ row }) => row.slots[3],
    sortable: false,
    ...slotColumnCommonFields,
  },
  {
    field: "4",
    headerName: slotDaysLookup[4],
    valueGetter: ({ row }) => row.slots[4],
    sortable: false,
    ...slotColumnCommonFields,
  },
  {
    field: "5",
    headerName: slotDaysLookup[5],
    valueGetter: ({ row }) => row.slots[5],
    sortable: false,
    ...slotColumnCommonFields,
  },
  {
    field: "6",
    headerName: slotDaysLookup[6],
    valueGetter: ({ row }) => row.slots[6],
    sortable: false,
    ...slotColumnCommonFields,
  },
  {
    field: "7",
    headerName: slotDaysLookup[7],
    valueGetter: ({ row }) => row.slots[7],
    sortable: false,
    ...slotColumnCommonFields,
  },
];

export default columns;
