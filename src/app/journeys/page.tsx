"use client";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import { SetStateAction, useState } from "react";
import { Geoname, GeonameURLParams } from "../types";
import { type FormEvent } from "react";
import Badge from "react-bootstrap/Badge";

export default function Journeys() {
  const [input, setInput] = useState("");
  const [geonamesList, setGeonamesList] = useState<string[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<string>("");

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
    </div>
  );
}
