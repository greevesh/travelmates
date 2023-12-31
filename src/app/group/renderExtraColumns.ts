import generateCalendar from "./generateCalendar";
import { RenderExtraColumnsParams } from "./types";

const renderExtraColumns = ({
  currentYear,
  currentMonth,
  slotColumnCommonFields,
  setExtraColumns,
}: RenderExtraColumnsParams) => {
  const { daysInMonth } = generateCalendar(currentYear, currentMonth);

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
        maxWidth: 20,
        valueGetter: ({ row }) => row.locations[day],
        sortable: false,
        ...slotColumnCommonFields,
      };
    }
  );

  setExtraColumns([...extraColumns]);
};

export default renderExtraColumns;
