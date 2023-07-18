import React, { useState } from "react";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { DateRange, DateRangePickerComponentProps } from "../../types";

const DateRangePickerComponent: React.FC<DateRangePickerComponentProps> = ({
  startDate,
  endDate,
  handleDateChange,
}) => {
  // const [val, setVal] = useState<DateRange>({
  //   start: null,
  //   end: null,
  // });

  return (
    <DateRangePicker
      value={[startDate, endDate]}
      onChange={(newVal) => handleDateChange(newVal)}
    />
  );
};

export default DateRangePickerComponent;
