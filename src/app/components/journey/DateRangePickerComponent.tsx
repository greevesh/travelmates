import React from "react";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SelectedDate, DateRangePickerComponentProps } from "../../types";

const DateRangePickerComponent: React.FC<DateRangePickerComponentProps> = ({
  startDate,
  endDate,
  handleDateChange,
}) => {
  return (
    <DateRangePicker
      value={[startDate, endDate]}
      onChange={(newVal: SelectedDate[]) => handleDateChange(newVal)}
    />
  );
};

export default DateRangePickerComponent;
