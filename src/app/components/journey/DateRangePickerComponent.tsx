import React, { useEffect, useState } from "react";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SelectedDate, DateRangePickerComponentProps } from "../../types";
import { getAuth } from "firebase/auth";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "@root/firebase/app";
import { Dayjs } from "dayjs";

const DateRangePickerComponent: React.FC<DateRangePickerComponentProps> = ({
  startDate,
  endDate,
  handleDateChange,
}) => {
  const [selectedDateRanges, setSelectedDateRanges] = useState<
    { start: Date; end: Date }[]
  >([]);

  const getSelectedDates = async () => {
    const currentUserID = getAuth().currentUser?.uid;
    if (currentUserID) {
      const q = query(
        collection(db, "journeys"),
        where("userID", "==", currentUserID)
      );
      const querySnapshot = await getDocs(q);
      const dateRanges: { start: Date; end: Date }[] = [];
      querySnapshot.forEach((doc) => {
        const startDate = new Date(doc.data().startDate * 1000);
        const endDate = new Date(doc.data().endDate * 1000);
        dateRanges.push({ start: startDate, end: endDate });
      });
      setSelectedDateRanges(dateRanges);
    }
  };

  const isDateInRange = (date: Date): boolean => {
    for (const dateRange of selectedDateRanges) {
      if (date >= dateRange.start && date <= dateRange.end) {
        return true;
      }
    }
    return false;
  };

  const isSelected = (date: Dayjs) => {
    const selectedDate = date.toDate();
    return isDateInRange(selectedDate);
  };

  useEffect(() => {
    getSelectedDates();
  }, []);

  useEffect(() => {
    console.log("Selected Date Ranges:", selectedDateRanges);
  }, [selectedDateRanges]);

  return (
    <DateRangePicker
      value={[startDate, endDate]}
      onChange={(newVal: SelectedDate[]) => handleDateChange(newVal)}
      shouldDisableDate={isSelected}
    />
  );
};

export default DateRangePickerComponent;
