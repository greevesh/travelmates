"use client";
import React, { useEffect, useState } from "react";
import Search from "./Search";
import SelectedBadge from "../SelectedBadge";
import DateRangePickerComponent from "./DateRangePickerComponent";
import CreateJourneyButton from "./CreateJourneyButton";
import {
  setDoc,
  doc,
  Timestamp as firebaseTimestamp,
} from "firebase/firestore";
import { db } from "firebase/app";
import {
  Geoname,
  GeonameResponse,
  GeonameURLParams,
  JourneyData,
  Timestamp,
  DateRange,
  SelectedDate,
} from "src/app/types";
import { generateRandomID } from "src/app/helpers";
import { getAuth } from "firebase/auth";

const Journey: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [geonamesList, setGeonamesList] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<string>("");
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

  useEffect(() => {
    selectedItem !== "" && dateRange.start !== null && dateRange.end !== null
      ? setEmptyInput(false)
      : setEmptyInput(true);
    console.log("is input empty?", emptyInput);
  }, [selectedItem, dateRange]);

  useEffect(() => {
    console.log("Date Ranges: ", dateRange);

    const selectedStartDate: Date | undefined = dateRange.start?.$d;
    let startTimestamp: number | undefined;
    selectedStartDate !== undefined
      ? (startTimestamp = firebaseTimestamp.fromDate(selectedStartDate).seconds)
      : undefined;

    selectedStartDate ? console.log(startTimestamp) : null;

    const selectedEndDate: Date | undefined = dateRange.end?.$d;
    let endTimestamp: number | undefined;
    selectedEndDate !== undefined
      ? (endTimestamp = firebaseTimestamp.fromDate(selectedEndDate).seconds)
      : undefined;

    selectedEndDate ? console.log(endTimestamp) : null;

    setTimestamps({
      start: startTimestamp,
      end: endTimestamp,
    });

    console.log("Timestamps: ", timestamps);
  }, [dateRange]);

  let journey: JourneyData | null = null;

  const fetchPlace = async (query: string): Promise<void> => {
    const params: GeonameURLParams = {
      username: "greevesh",
      q: query,
      maxRows: "10",
      orderBy: "name",
      name_startsWith: query,
      featureCode: "PPL", // filters cities, filters out countries
    };

    const apiURL: URL = new URL("http://api.geonames.org/searchJSON");

    Object.entries(params).forEach(([key, value]) => {
      apiURL.searchParams.set(key, value);
    });

    try {
      const response: Response = await fetch(apiURL);
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const data: GeonameResponse = await response.json();
      filterResults(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const filterResults = (data: GeonameResponse): void => {
    const startsWithCapital = (text: string): boolean => {
      return text[0] === text[0].toUpperCase();
    };
    const filteredResults: Geoname[] = data.geonames.filter((place: Geoname) =>
      startsWithCapital(place.name)
    );
    const placeNames: string[] = filteredResults.map(
      (place: Geoname) => place.name
    );
    const uniquePlaceNames: string[] = [...new Set(placeNames)];
    setGeonamesList(uniquePlaceNames);
    console.log(geonamesList);
    console.log(data);
  };

  const handleSelect = (selectedItem: string): void => {
    setInput("");
    setSelectedItem(selectedItem);
    dateRange;
  };

  const handleSearchChange = (value: string): void => {
    setInput(value);
    fetchPlace(value);
  };

  const handleDelete = (): void => {
    setSelectedItem("");
    const badge: HTMLElement | null = document.getElementById("badge");
    badge ? (badge.style.display = "none") : null;
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
    } catch (error) {
      console.log(error);
    }
  };

  journey = {
    id: generateRandomID(),
    place: selectedItem,
    startDate: timestamps.start,
    endDate: timestamps.end,
    userID: getAuth().currentUser?.uid,
  };

  const createJourney = async (journey: JourneyData | null): Promise<void> => {
    console.log(journey);
    if (journey !== null) {
      try {
        await setDoc(doc(db, "journeys", journey.id), journey);
        console.log("Journey document written successfully!", journey);
        console.log("before: ", dateRange);
        console.log("after: ", dateRange);
      } catch (error) {
        console.error("Error writing document: ", error);
      }
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

  console.log(dateRange);

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
    </div>
  );
};

export default Journey;
