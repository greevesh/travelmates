import { Dispatch, SetStateAction } from "react";
import { Row, Months } from "./types";

interface RenderRowsProps {
  currentMonthRows: Row[];
  months: Months[];
  currentMonth: number;
  currentYear: number;
  setCurrentMonthRows: Dispatch<SetStateAction<Row[]>>;
}

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
