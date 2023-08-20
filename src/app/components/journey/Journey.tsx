"use client";
import React, { useEffect, useState, useRef } from "react";
import Search from "./Search";
import SelectedBadge from "../SelectedBadge";
import DateRangePickerComponent from "./DateRangePickerComponent";
import CreateJourneyButton from "./CreateJourneyButton";
import {
  setDoc,
  doc,
  Timestamp as firebaseTimestamp,
} from "firebase/firestore";
import { db } from "@root/firebase/app";
import {
  Geoname,
  GeonameResponse,
  GeonameURLParams,
  JourneyData,
  Timestamp,
  DateRange,
  SelectedDate,
} from "../../types";
import { generateRandomID } from "../../helpers";
import { getAuth } from "firebase/auth";
import formatDate from "./formatDate";
import fetchLocation from "./fetchLocation";

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
  const [createdJourneys, setCreatedJourneys] = useState<JourneyData[]>([]);

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

  let journey: JourneyData | null = null;

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
      await createJourney(journey);
      clearForm();
      setSpinnerVisible(false);
      if (journey) {
        setCreatedJourneys((prevCreatedJourneys) => [
          ...prevCreatedJourneys,
          {
            id: journey?.id,
            location: journey?.location,
            startDate: journey?.startDate,
            endDate: journey?.endDate,
            userID: journey?.userID,
          },
        ]);
      }
    } catch (error) {
      setSpinnerVisible(false);
      setError(true);
      setErrorMessage("There was a problem creating a journey");
    }
  };

  journey = {
    id: generateRandomID(),
    location: selectedItem,
    startDate: timestamps.start,
    endDate: timestamps.end,
    userID: getAuth().currentUser?.uid,
  };

  const createJourney = async (journey: JourneyData | null): Promise<void> => {
    if (journey) {
      try {
        await setDoc(doc(db, "journeys", journey.id), journey);
      } catch (error) {
        console.error("Error writing document: ", error);
      }
    } else {
    }
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
        journey={journey}
        handleSubmit={handleSubmit}
        spinnerVisible={spinnerVisible}
      />
      {error ? errorMessage : null}
      {createdJourneys.length > 0
        ? createdJourneys.map((createdJourney, index) => (
            <div key={index}>
              {createdJourney.location} - {formatDate(createdJourney.startDate)}{" "}
              - {formatDate(createdJourney.endDate)}
            </div>
          ))
        : null}
    </div>
  );
};

export default Journey;
