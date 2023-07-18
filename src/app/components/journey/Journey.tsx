"use client";
import React, { useEffect, useState } from "react";
import Search from "./Search";
import SelectedPlaceBadge from "./SelectedPlaceBadge";
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
} from "../../types";
import { generateRandomID } from "../../helpers";

const Journey = () => {
  const [input, setInput] = useState<string>("");
  const [geonamesList, setGeonamesList] = useState<string[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<string>("");
  const [dateRange, setDateRange] = useState<DateRange>({
    start: null,
    end: null,
  });
  const [timestamps, setTimestamps] = useState<Timestamp>({
    start: null,
    end: null,
  });
  const [emptyInput, setEmptyInput] = useState<boolean>(true);

  useEffect(() => {
    selectedPlace !== "" && dateRange.start !== null && dateRange.end !== null
      ? setEmptyInput(false)
      : setEmptyInput(true);
    console.log("is input empty?", emptyInput);
  }, [selectedPlace, dateRange]);

  useEffect(() => {
    console.log("Date Ranges: ", dateRange);

    const startTimestamp = dateRange.start?.$d
      ? firebaseTimestamp.fromDate(dateRange.start.$d).seconds
      : null;

    const endTimestamp = dateRange.end?.$d
      ? firebaseTimestamp.fromDate(dateRange.end.$d).seconds
      : null;

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
    };

    const apiURL = new URL("http://api.geonames.org/searchJSON");

    Object.entries(params).forEach(([key, value]) => {
      apiURL.searchParams.set(key, value);
    });

    try {
      const response = await fetch(apiURL);
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
    const filteredResults: Geoname[] = data.geonames.filter(
      (place: Geoname) => place.population > 1000
    );
    const placeNames: string[] = filteredResults.map(
      (place: Geoname) => place.name
    );
    const uniquePlaceNames: string[] = [...new Set(placeNames)];
    setGeonamesList(uniquePlaceNames);
    console.log(geonamesList);
    console.log(data);
  };

  const handleSelect = (selectedPlace: string): void => {
    setInput("");
    setSelectedPlace(selectedPlace);
    dateRange;
  };

  const handleDelete = (): void => {
    setSelectedPlace("");
    const badge: HTMLElement | null = document.getElementById("badge");
    badge!.style.display = "none";
  };

  const handleChange = (value: string): void => {
    setInput(value);
    fetchPlace(value);
  };

  journey = {
    id: generateRandomID(),
    place: selectedPlace,
    startDate: timestamps.start,
    endDate: timestamps.end,
  };

  const clearForm = (): void => {
    setSelectedPlace("");
    setDateRange({
      start: null,
      end: null,
    });
    setEmptyInput(true);
  };

  const handleSubmit = (): void => {
    console.log("submitted");
    createJourney(journey);
    clearForm();
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

  console.log(dateRange);

  const handleDateChange = (newDate: any): void => {
    const startDate = newDate[0];
    const endDate = newDate[1];
    setDateRange({
      start: startDate,
      end: endDate,
    });
  };

  return (
    <div>
      <Search
        input={input}
        geonamesList={geonamesList}
        handleChange={handleChange}
        handleSelect={handleSelect}
      />
      {selectedPlace !== "" && (
        <SelectedPlaceBadge
          selectedPlace={selectedPlace}
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
      />
    </div>
  );
};

export default Journey;
