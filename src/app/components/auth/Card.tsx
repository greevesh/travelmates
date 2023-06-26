"use client";
import Card from "react-bootstrap/Card";
import styles from "../../styles/auth/card-container.module.css";
import SignInGoogleBtn from "../auth/SignInGoogleBtn";

const AuthCard = () => {
  return (
    <div className={styles.container}>
      <Card style={{ width: "22rem" }}>
        <Card.Body>
          <Card.Title>Sign in to TravelM@tes</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            You must be signed in to use the app
          </Card.Subtitle>
          <SignInGoogleBtn />
        </Card.Body>
      </Card>
    </div>
  );
};

export default AuthCard;
