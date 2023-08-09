import generateCalendar from "./generateCalendar";
import { GridColDef, GridCellParams } from "@mui/x-data-grid";

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const calendar = generateCalendar(currentYear, currentMonth);

const currentMonthDays: string[] = [];

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
  },
];

const slotColumnCommonFields: Partial<GridColDef> = {
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

const generateCurrentMonthDays = () => {
  calendar.forEach((date) => {
    const day: string = date.day.toString();
    columns.push({
      field: day,
      headerName: day,
      valueGetter: ({ row }) => {
        row.slots[day];
      },
      sortable: false,
      ...slotColumnCommonFields,
    });
  });
};

generateCurrentMonthDays();
console.log(currentMonthDays);

export default columns;
