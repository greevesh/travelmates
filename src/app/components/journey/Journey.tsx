"use client";
import React, { useEffect, useState, useRef } from "react";
import Search from "./Search";
import SelectedBadge from "../SelectedBadge";
import DateRangePickerComponent from "./DateRangePickerComponent";
import CreateJourneyButton from "./CreateJourneyButton";
import CreatedJourneyBadge from "../CreatedJourneyBadge";
import { Timestamp as firebaseTimestamp } from "firebase/firestore";
import {
  JourneyGetData,
  JourneyPostData,
  Timestamp,
  DateRange,
  SelectedDate,
} from "../../types";
import { generateRandomID } from "../../helpers";
import { getAuth } from "firebase/auth";
import formatDate from "./formatDate";
import fetchLocation from "./fetchLocation";
import createJourney from "./createJourney";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "@root/firebase/app";

const Journey: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [geonamesList, setGeonamesList] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<string>("");
  const selectedJourneyBadge = useRef<HTMLElement | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>({
    start: null,
    end: null,
  });
  const [timestamps, setTimestamps] = useState<Timestamp>({
    start: undefined,
    end: undefined,
  });
  const [emptyInput, setEmptyInput] = useState<boolean>(true);
  const [spinnerVisible, setSpinnerVisible] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [journeyDataLoaded, setJourneyDataLoaded] = useState(false);
  const [journeyData, setJourneyData] = useState<JourneyGetData[]>([]);

  const fetchJourneys = async (): Promise<void> => {
    const currentUserID = localStorage.getItem("userID");

    if (currentUserID) {
      const q = query(
        collection(db, "journeys"),
        where("userID", "==", currentUserID)
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const location: string = doc.data().location;
        const startDate = new Date(doc.data().startDate * 1000);
        const endDate = new Date(doc.data().endDate * 1000);

        const newJourneyData: JourneyGetData = {
          location,
          dateRange: { startDate, endDate },
        };

        setJourneyData((prevJourneyData) => [
          ...prevJourneyData,
          newJourneyData,
        ]);

        setJourneyDataLoaded(true);
      });
    } else {
      console.log("User isn't authenticated");
    }
  };

  useEffect(() => {
    fetchJourneys();
  }, []);

  useEffect(() => {
    selectedItem !== "" && dateRange.start !== null && dateRange.end !== null
      ? setEmptyInput(false)
      : setEmptyInput(true);
  }, [selectedItem, dateRange]);

  useEffect(() => {
    const selectedStartDate: Date | undefined = dateRange.start?.$d;
    let startTimestamp: number | undefined;
    selectedStartDate !== undefined
      ? (startTimestamp = firebaseTimestamp.fromDate(selectedStartDate).seconds)
      : undefined;

    const selectedEndDate: Date | undefined = dateRange.end?.$d;
    let endTimestamp: number | undefined;
    selectedEndDate !== undefined
      ? (endTimestamp = firebaseTimestamp.fromDate(selectedEndDate).seconds)
      : undefined;

    setTimestamps({
      start: startTimestamp,
      end: endTimestamp,
    });
  }, [dateRange]);

  let journeyGet: JourneyGetData | null = null;
  let journeyPost: JourneyPostData | null = null;

  const handleSelect = (selectedItem: string): void => {
    setInput("");
    setSelectedItem(selectedItem);
    dateRange;
  };

  const handleSearchChange = (value: string): void => {
    setInput(value);
    fetchLocation(value, setError, setErrorMessage, setGeonamesList);
  };

  const handleDelete = (): void => {
    setSelectedItem("");
    selectedJourneyBadge.current
      ? (selectedJourneyBadge.current.style.display = "none")
      : null;
  };

  const handleDateChange = (newDate: SelectedDate[]): void => {
    const startDate: SelectedDate = newDate[0];
    const endDate: SelectedDate = newDate[1];
    setDateRange({
      start: startDate,
      end: endDate,
    });
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      setSpinnerVisible(true);
      await createJourney(journeyPost);
      clearForm();
      setSpinnerVisible(false);
      if (journeyGet) {
        setJourneyData((journeyData) => [
          ...journeyData,
          {
            location: journeyGet?.location,
            dateRange: {
              startDate: journeyGet?.dateRange.startDate,
              endDate: journeyGet?.dateRange.endDate,
            },
          },
        ]);
      }
    } catch (error) {
      setSpinnerVisible(false);
      setError(true);
      setErrorMessage("There was a problem creating a journey");
    }
  };

  journeyPost = {
    id: generateRandomID(),
    location: selectedItem,
    dateRange: {
      startDate: timestamps.start,
      endDate: timestamps.end,
    },
    userID: getAuth().currentUser?.uid,
  };

  const clearForm = (): void => {
    setSelectedItem("");
    setDateRange({
      start: null,
      end: null,
    });
    setEmptyInput(true);
  };

  return (
    <div>
      <Search
        input={input}
        geonamesList={geonamesList}
        handleChange={handleSearchChange}
        handleSelect={handleSelect}
      />
      {selectedItem !== "" && (
        <SelectedBadge
          selectedItem={selectedItem}
          handleDelete={handleDelete}
        />
      )}
      <DateRangePickerComponent
        startDate={dateRange.start}
        endDate={dateRange.end}
        handleDateChange={handleDateChange}
      />
      <CreateJourneyButton
        emptyInput={emptyInput}
        journey={journeyPost}
        handleSubmit={handleSubmit}
        spinnerVisible={spinnerVisible}
      />
      {error ? errorMessage : null}
      {journeyDataLoaded ? (
        journeyData.length > 0 ? (
          journeyData.map((journey, index) => (
            <CreatedJourneyBadge
              key={index}
              location={journey.location}
              startDate={journey.dateRange.startDate?.toDateString()}
              endDate={journey.dateRange.endDate?.toDateString()}
              journey={journeyGet}
            />
          ))
        ) : (
          <p>No journeys found.</p>
        )
      ) : (
        <p>Loading journeys...</p>
      )}
    </div>
  );
};

export default Journey;
