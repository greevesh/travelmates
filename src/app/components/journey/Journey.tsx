"use client";
import React, { useEffect, useState } from "react";
import Search from "./Search";
import SelectedPlaceBadge from "./SelectedPlaceBadge";
import DateRangePickerComponent from "./DateRangePickerComponent";
import CreateJourneyButton from "./CreateJourneyButton";
import { getFirestore, Firestore, setDoc, doc } from "firebase/firestore";
import firebaseConfig from "@root/firebase/config";
import { initializeApp } from "firebase/app";
import { FirebaseApp } from "firebase/app";
import {
  Geoname,
  GeonameResponse,
  GeonameURLParams,
  JourneyData,
  Timestamp,
  DateRange,
} from "../../types";
import { Timestamp as firebaseTimestamp } from "firebase/firestore";

const Journey = () => {
  const [input, setInput] = useState("");
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

  useEffect(() => {
    console.log("Date Ranges: ", dateRange);

    const startTimestamp = dateRange.start?.$d
      ? firebaseTimestamp.fromDate(dateRange.start.$d).seconds
      : null;

    const endTimestamp = dateRange.end?.$d
      ? firebaseTimestamp.fromDate(dateRange.end.$d).seconds
      : null;

    setTimestamps((dates) => ({
      ...dates,
      start: startTimestamp,
      end: endTimestamp,
    }));

    console.log("Timestamps: ", timestamps);
  }, [dateRange]);

  const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
  const db: Firestore = getFirestore(firebaseApp);

  let journey: JourneyData | null = null;

  const fetchPlace = async (query: string) => {
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

  const filterResults = (data: GeonameResponse) => {
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

  const handleSelect = (selectedPlace: string) => {
    setInput("");
    setSelectedPlace(selectedPlace);
  };

  const handleDelete = () => {
    setSelectedPlace("");
    const badge: HTMLElement | null = document.getElementById("badge");
    badge!.style.display = "none";
  };

  const handleChange = (value: string) => {
    setInput(value);
    fetchPlace(value);
  };

  const generateRandomID = (): string => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 20; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  journey = {
    id: generateRandomID(),
    place: selectedPlace,
    start_date: timestamps.start,
    end_date: timestamps.end,
  };

  const createJourney = async (journey: JourneyData | null): Promise<void> => {
    console.log(journey);
    if (journey !== null) {
      try {
        await setDoc(doc(db, "journeys", journey.id), journey);
        console.log("Journey document written successfully!", journey);
      } catch (error) {
        console.error("Error writing document: ", error);
      }
    }
  };

  const handleDateChange = (newDate: any) => {
    const newStartDate = newDate[0];
    const newEndDate = newDate[1];
    setDateRange((prevDateRange) => ({
      ...prevDateRange,
      start: newStartDate,
      end: newEndDate,
    }));
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
      <DateRangePickerComponent handleDateChange={handleDateChange} />
      <CreateJourneyButton journey={journey} createJourney={createJourney} />
    </div>
  );
};

export default Journey;
