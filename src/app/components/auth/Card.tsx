"use client";
import styles from "src/app/styles/auth/card-container.module.css";
import SignInGoogleBtn from "../../../../src/app/components/auth/SignInGoogleBtn";

const AuthCard = () => {
  return (
    <div className={styles.container}>
      <h1>Sign in to TravelM@tes</h1>
      <p>You must be signed in to use the app</p>
      <SignInGoogleBtn />
    </div>
  );
};

export default AuthCard;
