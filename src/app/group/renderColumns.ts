import generateCalendar from "./generateCalendar";
import { generatedColumns } from "./columns";
import { RenderColumnsProps, CalendarDay } from "./types";

const renderColumns = ({
  currentYear,
  currentMonth,
  slotColumnCommonFields,
}: RenderColumnsProps): void => {
  const calendar: CalendarDay[] = generateCalendar(currentYear, currentMonth);

  calendar.forEach((date) => {
    const day: string = date.day.toString();
    generatedColumns.push({
      field: day,
      headerName: day,
      valueGetter: ({ row }) => row.locations[day],
      sortable: false,
      ...slotColumnCommonFields,
    });
  });
};

export default renderColumns;
