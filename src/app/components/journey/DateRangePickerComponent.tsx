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

  const preventInvalidEndDates = (date?: Date): boolean => {
    if (startDate && disabledDateRanges.length > 0) {
      let nearestDisabledEndDate = disabledDateRanges.reduce(
        (nearestDate, dateRange) =>
          dateRange.end > nearestDate && dateRange.end > startDate
            ? dateRange.end
            : nearestDate,
        new Date(0)
      );

      if (nearestDisabledEndDate > startDate) {
        if (date) {
          return date > nearestDisabledEndDate;
        }
      }
    }
    return false;
  };

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
  }, []);

  const isSelected = (date: Dayjs): boolean => {
    const selectedDate = date.toDate();
    return isDateInRange(selectedDate) || preventInvalidEndDates(selectedDate);
  };

  return (
    currentUserID !== undefined &&
    (dataFetched ? (
      <DateRangePicker
        value={[startDate, endDate]}
        onChange={(newVal: SelectedDate[]) => handleDateChange(newVal)}
        shouldDisableDate={isSelected}
        disablePast
      />
    ) : (
      <div>Loading...</div>
    ))
  );
};

export default DateRangePickerComponent;
