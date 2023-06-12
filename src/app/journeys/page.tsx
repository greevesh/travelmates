"use client";
import Form from "react-bootstrap/Form";
import { useState } from "react";

export default function Journeys() {
  const [input, setInput] = useState("");

  const fetchPlace = async (query: string) => {
    const apiUrl = new URL("http://api.geonames.org/searchJSON");
    apiUrl.searchParams.set("username", "greevesh");
    apiUrl.searchParams.set("q", query);

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.geonames.map((geoname: any) => geoname.name));
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
    </div>
  );
}
