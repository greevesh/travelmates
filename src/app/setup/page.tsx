"use client";
import { useState } from "react";
import Card from "react-bootstrap/Card";
import Journey from "../components/journey/Journey";
import styles from "../styles/auth/card-container.module.css";
import NextButton from "./NextButton";
import Search from "../groups/Search";
import PreviousButton from "./PreviousButton";

import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/app";

const Setup = () => {
  const [input, setInput] = useState<string>("");
  const [usersList, setUsersList] = useState<string[]>([]);

  let [step, setStep] = useState<number>(1);

  const fetchUsers = async (): Promise<void> => {
    const q = query(collection(db, "users"));
    const names: string[] = [];

    const data = await getDocs(q);
    const fetchUsernames = async (): Promise<void> => {
      try {
        data.forEach((doc) => {
          console.log(doc.id, " => ", doc.data().displayName);
          names.push(doc.data().displayName);
        });
      } catch (err) {
        console.log(err);
      }
    };

    await fetchUsernames();
    setUsersList(names);
    console.log(usersList);
  };

  const handleSearchChange = (value: string): void => {
    setInput(value);
    fetchUsers();
    console.log(input);
  };

  const handleSelect = (selectedPlace: string): void => {
    setInput("");
    console.log(input);
  };

  const incrementStep = (): void => {
    setStep((step += 1));
    console.log(step);
  };

  const decrementStep = (): void => {
    setStep((step -= 1));
    console.log(step);
  };

  return (
    <div className={styles.container}>
      <Card style={{ width: "22rem", height: "20rem" }}>
        <Card.Body>
          <Card.Title>Create a Journey</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            So your mates will know where you&lsquo;ll be
          </Card.Subtitle>
          {step === 1 ? (
            <>
              <Journey />
              <div className="d-flex justify-content-end">
                <NextButton incrementStep={incrementStep} />
              </div>
            </>
          ) : (
            <>
              <Search
                input={input}
                handleSelect={handleSelect}
                handleChange={handleSearchChange}
                usersList={usersList}
              />
              <PreviousButton decrementStep={decrementStep} />
            </>
          )}
        </Card.Body>
        <div className="d-flex align-items-center">
          <div className="d-flex justify-content-center w-100">
            <p>Step {step}/2</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Setup;
