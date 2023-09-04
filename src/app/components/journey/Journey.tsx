"use client";
import React, { useEffect, useState, useRef } from "react";
import Search from "./Search";
import SelectedBadge from "../SelectedBadge";
import DateRangePickerComponent from "./DateRangePickerComponent";
import CreateJourneyButton from "./CreateJourneyButton";
import CreatedJourneyBadge from "../CreatedJourneyBadge";
import {
  Timestamp as firebaseTimestamp,
  serverTimestamp,
} from "firebase/firestore";
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
  const [journeyDataLoaded, setJourneyDataLoaded] = useState(false);
  const [journeyData, setJourneyData] = useState<JourneyGetData[]>([]);
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
        const location: string = doc.data().location;
        const startDate: Date = new Date(
          doc.data().dateRange?.startDate * 1000
        );
        const endDate: Date = new Date(doc.data().dateRange?.endDate * 1000);

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

          const startDate = new Date(data.dateRange?.startDate * 1000); // Use toDate() method
          const endDate = new Date(data.dateRange?.endDate * 1000);

          setJourneyData((prevJourneyData) => [
            ...prevJourneyData,
            {
              location: data.location,
              dateRange: {
                startDate,
                endDate,
              },
            },
          ]);

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
    // Your existing code here...

    // Add a setTimeout to display "No journeys found" after a certain period
    const timeoutId = setTimeout(() => {
      if (!journeyDataLoaded) {
        setShowNoJourneys(true);
      }
    }, 5000); // Adjust the timeout duration as needed (in milliseconds)

    return () => {
      clearTimeout(timeoutId); // Clear the timeout when the component unmounts
    };
  }, []);

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
      await getLastEntry();
      clearForm();
      setSpinnerVisible(false);
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
        journey={journeyPost}
        handleSubmit={handleSubmit}
        spinnerVisible={spinnerVisible}
      />
      {error ? errorMessage : null}
      {journeyDataLoaded && journeyData.length > 0 ? (
        journeyData.map((journey, index) => (
          <CreatedJourneyBadge
            key={index}
            location={journey.location}
            startDate={journey.dateRange.startDate?.toDateString()}
            endDate={journey.dateRange.endDate?.toDateString()}
            journey={journeyGet}
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
