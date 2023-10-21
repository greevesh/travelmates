import generateCalendar from "./generateCalendar";
import { RenderColumnsProps, CalendarDay } from "./types";

const renderColumns = ({
  currentYear,
  currentMonth,
  slotColumnCommonFields,
  setColumns,
}: RenderColumnsProps): void => {
  const { calendar, daysInMonth } = generateCalendar(currentYear, currentMonth);

  // generate first 28 days in the calendar because every month will have
  // at least 28 days
  const baseCalendarColumns = calendar
    .filter((date) => date.day <= 28)
    .map((date) => {
      const day: string = date.day.toString();
      return {
        field: day,
        headerName: day,
        valueGetter: ({ row }) => row.locations[day],
        sortable: false,
        ...slotColumnCommonFields,
      };
    });

  // columns that only need to be rendered once
  const baseColumns = [
    {
      field: "name",
      headerName: "Name",
      valueGetter: ({ row }) => row.name,
      sortable: false,
      ...slotColumnCommonFields,
    },
    ...baseCalendarColumns,
  ];

  const startIndex: number = 29;
  const endIndex: number = daysInMonth.length;

  // columns that may or may not be rendered (depending on month)
  const extraColumns = Array.from(
    { length: endIndex - startIndex + 1 },
    (_, index) => {
      const day = (startIndex + index).toString();
      return {
        field: day,
        headerName: day,
        valueGetter: ({ row }) => row.locations[day],
        sortable: false,
        ...slotColumnCommonFields,
      };
    }
  );

  setColumns([...baseColumns, ...extraColumns]);
};

export default renderColumns;
