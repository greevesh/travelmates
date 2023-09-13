import React, { useRef, useState } from "react";
import Badge from "react-bootstrap/Badge";

import { JourneyBadgeProps, Journey } from "../../types";
import { db } from "@root/firebase/app";
import { doc, deleteDoc } from "firebase/firestore";

const JourneyBadge: React.FC<JourneyBadgeProps> = ({
  location,
  startDate,
  endDate,
  journey,
  id,
  setJourneys,
  journeys,
}) => {
  const selectedJourneyBadge = useRef<HTMLDivElement | null>(null);

  const handleDeleteJourney = async (): Promise<void> => {
    if (id !== undefined) {
      try {
        const updatedJourneys = journeys.filter((journey) => journey.id !== id);
        console.log("Updated Journeys: ", updatedJourneys);
        try {
          console.log("Before: ", id);
          await deleteDoc(doc(db, "journeys", id));
          console.log("After: ", id);
          setJourneys(updatedJourneys);
        } catch (error) {
          console.log("Error with journey deletion", error);
        }
      } catch (error) {
        console.error("Error deleting journey:", error);
      }
    }
    console.log("Journeys: ", journeys);
    console.log("Journey: ", journey);
    console.log("ID: ", id);
  };

  return (
    <div ref={selectedJourneyBadge} className="mt-2">
      <Badge bg="secondary">
        <b>{location}</b> - {startDate} - {endDate}
        <span className="ms-1" onClick={handleDeleteJourney}>
          X
        </span>
      </Badge>
    </div>
  );
};

export default JourneyBadge;
