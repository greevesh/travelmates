import React, { useState } from "react";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { Timestamp } from "firebase/firestore";

interface DateRangePickerComponentProps {
  handleDateChange: (dateRange: DateRange) => void;
}

interface DateRange {
  start: Timestamp | null;
  end: Timestamp | null;
}

const DateRangePickerComponent: React.FC<DateRangePickerComponentProps> = ({
  handleDateChange,
}) => {
  const [dateRange, setDateRange] = useState<DateRange>({
    start: null,
    end: null,
  });

  const handleDateChangeInternal = (dateRange: any) => {
    const startDate = dateRange.start
      ? Timestamp.fromDate(dateRange.start)
      : null;
    const endDate = dateRange.end ? Timestamp.fromDate(dateRange.end) : null;

    setDateRange({ start: startDate, end: endDate });

    handleDateChange({ start: dateRange.start, end: dateRange.end });
  };

  return <DateRangePicker onChange={handleDateChangeInternal} />;
};

export default DateRangePickerComponent;
