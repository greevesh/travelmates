"use client";
import React, { useEffect, useState } from "react";
import Journey from "../components/setup-form/journey-form/JourneyForm";
import styles from "../styles/auth/card-container.module.css";
import NextButton from "../components/setup-form/NextButton";
import PreviousButton from "../components/setup-form/PreviousButton";

import GroupForm from "../components/setup-form/group-form/GroupForm";

const SetupPage: React.FC = () => {
  const [groupMembersLoaded, setGroupMembersLoaded] = useState(false);
  const [showNoGroupMembers, setShowNoGroupMembers] = useState(false);

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
      <div>
        <div>
          {step === 1 ? (
            <>
              <h1>Create some Journeys (max 5)</h1>
              <h2>So your mates will know where you&lsquo;ll be</h2>
              <Journey />
              <div className="d-flex justify-content-end">
                <NextButton incrementStep={incrementStep} />
              </div>
            </>
          ) : (
            <>
              <GroupForm />
              <PreviousButton decrementStep={decrementStep} />
            </>
          )}
        </div>
        <div className="d-flex align-items-center">
          <div className="d-flex justify-content-center w-100">
            <p>Step {step}/2</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupPage;
