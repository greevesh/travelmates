"use client";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import { SetStateAction, useState } from "react";
import { Geoname, GeonameURLParams } from "../types";

export default function Journeys() {
  const [input, setInput] = useState("");
  const [geonamesList, setGeonamesList] = useState<string[]>([]);

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

  const handleChange = (value: string) => {
    setInput(value);
    fetchPlace(value);
  };

  return (
    <div>
      <h1>Journeys</h1>
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search for any city"
          className="me-2"
          aria-label="Search"
          onChange={(e) => handleChange(e.target.value)}
        />
      </Form>
      {input && (
        <Card style={{ width: "18rem" }}>
          <ListGroup variant="flush">
            {geonamesList.map((name: string) => (
              <ListGroup.Item key={name}>{name}</ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      )}
    </div>
  );
}
