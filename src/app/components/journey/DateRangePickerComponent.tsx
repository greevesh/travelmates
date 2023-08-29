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
  const [selectedStartDates, setSelectedStartDates] = useState<string[]>([]);
  const [selectedEndDates, setSelectedEndDates] = useState<string[]>([]);

  const getSelectedDates = async () => {
    const currentUserID = getAuth().currentUser?.uid;
    if (currentUserID) {
      const q = query(
        collection(db, "journeys"),
        where("userID", "==", currentUserID)
      );
      const querySnapshot = await getDocs(q);
      const startDates: string[] = [];
      const endDates: string[] = [];
      querySnapshot.forEach((doc) => {
        const sd = new Date(doc.data().startDate * 1000).toDateString();
        startDates.push(sd);
        const ed = new Date(doc.data().endDate * 1000).toDateString();
        endDates.push(ed);
      });
      setSelectedStartDates(startDates);
      setSelectedEndDates(endDates);
    }
  };

  const isSelected = (date: Dayjs) => {
    const stringifiedDate = date.toDate().toDateString();
    return selectedStartDates.includes(stringifiedDate);
  };

  useEffect(() => {
    getSelectedDates();
  }, []);

  useEffect(() => {
    console.log("Selected Start Dates:", selectedStartDates);
  }, [selectedStartDates]);

  useEffect(() => {
    console.log("Selected End Dates:", selectedEndDates);
  }, [selectedEndDates]);

  return (
    <DateRangePicker
      value={[startDate, endDate]}
      onChange={(newVal: SelectedDate[]) => handleDateChange(newVal)}
      shouldDisableDate={isSelected}
    />
  );
};

export default DateRangePickerComponent;
