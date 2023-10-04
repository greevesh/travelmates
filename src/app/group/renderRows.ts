import { Row, RenderRowsProps } from "./types";

const renderRows = ({
  currentMonthRows,
  months,
  currentMonth,
  currentYear,
  setCurrentMonthRows,
}: RenderRowsProps): void => {
  const filteredRows: Row[] | undefined = currentMonthRows.filter((row) => {
    return row.month === months[currentMonth] && row.year === currentYear;
  });

  setCurrentMonthRows(filteredRows);
};

export default renderRows;
