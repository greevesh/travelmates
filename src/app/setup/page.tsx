"use client";
import Card from "react-bootstrap/Card";
import Journey from "../components/journey/Journey";
import styles from "../styles/auth/card-container.module.css";
import NextButton from "./NextButton";

const Setup = () => {
  return (
    <div className={styles.container}>
      <Card style={{ width: "22rem", height: "20rem" }}>
        <Card.Body>
          <Card.Title>Create a Journey</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            So your mates will know where you&lsquo;ll be
          </Card.Subtitle>
          <Journey />
        </Card.Body>
        <div className="d-flex align-items-center">
          <div className="d-flex justify-content-center w-100">
            <p>Step 1/2</p>
          </div>
          <div className="d-flex justify-content-end">
            <NextButton />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Setup;
