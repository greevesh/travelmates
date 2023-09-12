import React, { useEffect, useState } from "react";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SelectedDate, DateRangePickerComponentProps } from "../../types";
import { Dayjs } from "dayjs";
import { currentUserID } from "../../globals";

const DateRangePickerComponent: React.FC<DateRangePickerComponentProps> = ({
  startDate,
  endDate,
  handleDateChange,
  disabledDateRanges,
  setDisabledDateRanges,
}) => {
  const [dataFetched, setDataFetched] = useState(false);

  const getSelectedDates = async (): Promise<void> => {
    const dateRanges: { start: Date; end: Date }[] = [];
    setDisabledDateRanges(dateRanges);
    setDataFetched(true);
  };

  // const preventInvalidEndDates = (date: Date): boolean => {
  //   if (startDate) {
  //     const nearestDisabledEndDate = disabledDateRanges.reduce(
  //       (nearestDate, dateRange) =>
  //         dateRange.end > nearestDate && dateRange.end > startDate
  //           ? dateRange.end
  //           : nearestDate,
  //       new Date(0)
  //     );
  //     return date > nearestDisabledEndDate;
  //   }
  //   return false;
  // };

  const isDateInRange = (date: Date): boolean => {
    for (const dateRange of disabledDateRanges) {
      if (date >= dateRange.start && date <= dateRange.end) {
        return true;
      }
      console.log("Iterated Date Range:", dateRange);
    }
    return false;
  };

  useEffect(() => {
    getSelectedDates();
    console.log("Data Fetched:", dataFetched);
    console.log("Disabled Dates:", disabledDateRanges);
  }, []);

  const isSelected = (date: Dayjs): boolean => {
    const selectedDate = date.toDate();
    return isDateInRange(selectedDate);
  };

  return (
    currentUserID !== undefined &&
    (dataFetched ? (
      <DateRangePicker
        value={[startDate, endDate]}
        onChange={(newVal: SelectedDate[]) => handleDateChange(newVal)}
        shouldDisableDate={isSelected}
      />
    ) : (
      <div>Loading...</div>
    ))
  );
};

export default DateRangePickerComponent;
