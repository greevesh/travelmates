"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  Timestamp as firebaseTimestamp,
  serverTimestamp,
} from "firebase/firestore";
import { usePathname } from "next/navigation";
import Search from "./Search";
import SelectedBadge from "../group-form/SelectedBadge";
import DateRangePickerComponent from "./DateRangePickerComponent";
import CreateJourneyButton from "./CreateJourneyButton";
import JourneyBadge from "./JourneyBadge";
import Heading from "../Heading";
import {
  Journey,
  Timestamp,
  DateRange,
  SelectedDate,
} from "../../../create-journey/types";
import { generateRandomID } from "../../../globals";
import fetchJourneys from "../../../create-journey/fetchJourneys";
import fetchLocation from "../../../create-journey/fetchLocation";
import createJourney from "../../../create-journey/createJourney";
import getLatestJourney from "../../../create-journey/getLatestJourney";
import { currentUserID } from "../../../globals";

const JourneyForm: React.FC = () => {
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
  const [disabledDateRanges, setDisabledDateRanges] = useState<
    { start: Date; end: Date }[]
  >([]);

  const pathname = usePathname();

  useEffect(() => {
    fetchJourneys({ setJourneys, setJourneysLoaded });
  }, []);

  useEffect(() => {
    if (journeys.length > 0) {
      setDisabledDateRanges((prevDisabledDateRanges) => [
        ...prevDisabledDateRanges,
        {
          start: new Date(journeys[journeys.length - 1]?.dateRange.startDate),
          end: new Date(journeys[journeys.length - 1]?.dateRange.endDate),
        },
      ]);
    }
  }, [journeys]);

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
    disabledDateRanges.filter((dateRange) => {
      dateRange.start !== journey?.dateRange.startDate &&
        dateRange.end !== journey?.dateRange.endDate;
    });
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
      await getLatestJourney({ setJourneys, setJourneysLoaded });
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
    userID: currentUserID,
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
      {pathname.includes("/setup") ? (
        <Heading
          heading="Create Some Journeys"
          subheading="So your mates will know where you are"
        />
      ) : (
        <Heading heading="Edit Journeys" subheading="Add or remove journeys" />
      )}
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
        disabledDateRanges={disabledDateRanges}
        setDisabledDateRanges={setDisabledDateRanges}
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

export default JourneyForm;
