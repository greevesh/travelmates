"use client";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import { SetStateAction, useEffect, useState } from "react";
import { Geoname, GeonameURLParams } from "../types";
import { type FormEvent } from "react";
import Badge from "react-bootstrap/Badge";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { Button } from "react-bootstrap";

import { setDoc, doc, getFirestore, Firestore } from "firebase/firestore";
import { initializeApp, type FirebaseApp } from "firebase/app";
import firebaseConfig from "@root/firebase/config";

export default function Journeys() {
  const [input, setInput] = useState("");
  const [geonamesList, setGeonamesList] = useState<string[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<string>("");
  const [selectedStartDate, setSelectedStartDate] = useState<Date>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date>(null);
  // const [journey, setJourney] = useState<Journey | null>(null);

  const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
  const db: Firestore = getFirestore(firebaseApp);

  interface Journey {
    id: string;
    place: string;
    start_date: Date;
    end_date: Date;
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

  const filterResults = (data) => {
    const filteredResults = data.geonames.filter(
      (place: any) => place.population > 1000
    );
    const placeNames = filteredResults.map((place: any) => place.name);
    const uniquePlaceNames = [...new Set(placeNames)];
    setGeonamesList(uniquePlaceNames);
    console.log(geonamesList);
  };

  const matchResultsWithQuery = (results: any, query: string) => {
    const matchedPlaceNames: string[] = results.geonames.filter(
      (place: Geoname) =>
        place.name.toLowerCase().startsWith(query.toLowerCase())
    );
    console.log(matchedPlaceNames);
    const sortedResults = matchedPlaceNames.sort((a: any, b: any) =>
      a.name.localeCompare(b.name)
    );
    setGeonamesList(sortedResults);
  };

  const handleSelect = (e: FormEvent<HTMLFormElement>) => {
    console.log(e);
    setInput("");
    const form: HTMLElement | null = document.getElementById("form");
    form.reset();
    setSelectedPlace(e);
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
    const charsLength = chars.length;
    for (let i = 0; i < 20; i++) {
      result += chars.charAt(Math.floor(Math.random() * charsLength));
    }
    return result;
  };

  journey = {
    id: generateRandomID(),
    place: selectedPlace,
    start_date: selectedStartDate,
    end_date: selectedEndDate,
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

  const handleDateChange = (dateRange: any) => {
    // dateRange will be an object with 'start' and 'end' properties
    setSelectedStartDate(new Date("2023-07-10"));
    setSelectedEndDate(new Date("2023-07-17"));
  };

  return (
    <div>
      <h1>Journeys</h1>
      <form id="form" className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search for any city"
          className="me-2"
          aria-label="Search"
          onChange={(e) => handleChange(e.target.value)}
        />
      </form>
      {input && (
        <Card style={{ width: "18rem" }}>
          <ListGroup variant="flush">
            {geonamesList.map((name: string) => (
              <ListGroup.Item onClick={(e) => handleSelect(name)} key={name}>
                {name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      )}
      {selectedPlace !== "" && (
        <Badge className="mt-2" id="badge" bg="secondary">
          {selectedPlace}
          <span onClick={handleDelete} className="ms-1">
            X
          </span>
        </Badge>
      )}
      <DateRangePicker onChange={handleDateChange} />
      <Button onClick={() => createJourney(journey)}>Create Journey</Button>
    </div>
  );
}
