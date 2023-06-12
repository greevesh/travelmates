"use client";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import { useState } from "react";

export default function Journeys() {
  const [input, setInput] = useState("");
  const [geonamesList, setGeonamesList] = useState<string[]>([]);

  const fetchPlace = async (query: string) => {
    const apiUrl = new URL("http://api.geonames.org/searchJSON");
    apiUrl.searchParams.set("username", "greevesh");
    apiUrl.searchParams.set("q", query);
    apiUrl.searchParams.set("maxRows", "10");

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.geonames.map((geoname: any) => geoname.name));
        const names = data.geonames.map((geoname: any) => geoname.name);
        setGeonamesList(names);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
      <Card style={{ width: "18rem" }}>
        <ListGroup variant="flush">
          {geonamesList.map((name: string) => (
            <ListGroup.Item key={name}>{name}</ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </div>
  );
}
