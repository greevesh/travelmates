"use client";
import React, { useEffect, useState, useRef } from "react";
import Search from "./Search";
import SelectedBadge from "../SelectedBadge";
import DateRangePickerComponent from "./DateRangePickerComponent";
import CreateJourneyButton from "./CreateJourneyButton";
import JourneyBadge from "../JourneyBadge";
import {
  Timestamp as firebaseTimestamp,
  serverTimestamp,
} from "firebase/firestore";
import { Journey, Timestamp, DateRange, SelectedDate } from "../../types";
import { generateRandomID } from "../../helpers";
import { getAuth } from "firebase/auth";
import formatDate from "./formatDate";
import fetchLocation from "./fetchLocation";
import createJourney from "./createJourney";
import {
  query,
  collection,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
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
  const [journeysLoaded, setJourneysLoaded] = useState(false);
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [showNoJourneys, setShowNoJourneys] = useState(false);

  const currentUserID = localStorage.getItem("userID");

  const fetchJourneys = async (): Promise<void> => {
    if (currentUserID) {
      const q = query(
        collection(db, "journeys"),
        where("userID", "==", currentUserID)
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const id: string = doc.data().id;
        const location: string = doc.data().location;
        const startDate: Date = new Date(
          doc.data().dateRange?.startDate * 1000
        );
        const endDate: Date = new Date(doc.data().dateRange?.endDate * 1000);

        const newJourneyData: Journey = {
          id,
          location,
          dateRange: { startDate, endDate },
        };

        setJourneys((prevJourneyData) => [...prevJourneyData, newJourneyData]);

        setJourneysLoaded(true);
      });
    } else {
      console.log("User isn't authenticated");
    }
  };

  const getLastEntry = async () => {
    try {
      const currentUserID = localStorage.getItem("userID");

      if (currentUserID) {
        const q = query(
          collection(db, "journeys"),
          where("userID", "==", currentUserID),
          orderBy("created", "desc"),
          limit(1)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const lastDocument = querySnapshot.docs[0];
          const data = lastDocument.data();

          const startDate = new Date(data.dateRange?.startDate * 1000);
          const endDate = new Date(data.dateRange?.endDate * 1000);

          setJourneys((prevJourneyData) => [
            ...prevJourneyData,
            {
              id: data.id,
              location: data.location,
              dateRange: {
                startDate,
                endDate,
              },
            },
          ]);

          setJourneysLoaded(true);

          console.log("Last Entry Data:", data);
        } else {
          console.log("No documents found in the collection.");
        }
      } else {
        console.log("User isn't authenticated");
      }
    } catch (error) {
      console.error("Error getting last entry:", error);
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

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!journeysLoaded) {
        setShowNoJourneys(true);
      }
    }, 10000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  let journey: Journey | null = null;

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
      await getLastEntry();
      clearForm();
      setSpinnerVisible(false);
    } catch (error) {
      setSpinnerVisible(false);
      setError(true);
      setErrorMessage("There was a problem creating a journey");
    }
  };

  journey = {
    id: generateRandomID(),
    location: selectedItem,
    dateRange: {
      startDate: timestamps.start,
      endDate: timestamps.end,
    },
    userID: getAuth().currentUser?.uid,
    created: serverTimestamp(),
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
        journeyCount={journeys.length}
      />
      {error ? errorMessage : null}
      {journeysLoaded && journeys.length > 0 ? (
        journeys.map((journey, index) => (
          <JourneyBadge
            key={index}
            location={journey.location}
            startDate={
              journey.dateRange.startDate instanceof Date
                ? journey.dateRange.startDate.toDateString()
                : ""
            }
            endDate={
              journey.dateRange.endDate instanceof Date
                ? journey.dateRange.endDate.toDateString()
                : ""
            }
            journey={journey}
            id={journey.id}
            setJourneys={setJourneys}
            journeys={journeys}
          />
        ))
      ) : showNoJourneys ? (
        <p>No journeys found.</p>
      ) : (
        <p>Loading journeys...</p>
      )}
    </div>
  );
};

export default Journey;
