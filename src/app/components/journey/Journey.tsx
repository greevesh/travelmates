"use client";
import React, { useState } from "react";
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
  DateRange,
  JourneyData,
} from "../../types";
import styles from "../../styles/journey/date-range-picker.module.css";

const Journey = () => {
  const [input, setInput] = useState("");
  const [geonamesList, setGeonamesList] = useState<string[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<string>("");
  const [dateRange, setDateRange] = useState<DateRange>({
    start: null,
    end: null,
  });

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
    date_range: dateRange,
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

  const handleDateChange = (dateRange: DateRange) => {
    setDateRange(dateRange);
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
      <div className={styles.picker}>
        <DateRangePickerComponent handleDateChange={handleDateChange} />
      </div>
      <CreateJourneyButton journey={journey} createJourney={createJourney} />
    </div>
  );
};

export default Journey;
