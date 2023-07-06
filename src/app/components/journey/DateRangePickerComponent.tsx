import React, { useState } from "react";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { DateRange, DateRangePickerComponentProps } from "../../types";

const DateRangePickerComponent: React.FC<DateRangePickerComponentProps> = ({
  handleDateChange,
}) => {
  // const [val, setVal] = useState<DateRange>({
  //   start: null,
  //   end: null,
  // });

  // console.log(val);

  return <DateRangePicker onChange={(newVal) => handleDateChange(newVal)} />;
};

export default DateRangePickerComponent;
