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

export default function Journeys() {
  const [input, setInput] = useState("");
  const [geonamesList, setGeonamesList] = useState<string[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<string>("");
  const [dateRange, setDateRange] = useState<DateRange>({
    start: null,
    end: null,
  });

  const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
  const db: Firestore = getFirestore(firebaseApp);

  interface DateRange {
    start: Date | null;
    end: Date | null;
  }

  interface Journey {
    id: string;
    place: string;
    date_range: DateRange;
  }

  let journey: Journey | null = null;

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

    fetch(apiURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed");
        }
        return response.json();
      })
      .then((data) => {
        filterResults(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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

  const createJourney = async (journey: Journey | null): Promise<void> => {
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
      <DateRangePickerComponent handleDateChange={handleDateChange} />
      <CreateJourneyButton journey={journey} createJourney={createJourney} />
    </div>
  );
}
