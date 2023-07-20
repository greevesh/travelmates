"use client";
import { useState } from "react";
import Card from "react-bootstrap/Card";
import Journey from "../components/journey/Journey";
import styles from "../styles/auth/card-container.module.css";
import NextButton from "./NextButton";
import PreviousButton from "./PreviousButton";

const Setup = () => {
  let [step, setStep] = useState<number>(1);

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
            <PreviousButton decrementStep={decrementStep} />
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
