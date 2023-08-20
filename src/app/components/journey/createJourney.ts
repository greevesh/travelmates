import { JourneyData } from "../../types";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@root/firebase/app";

const createJourney = async (journey: JourneyData | null): Promise<void> => {
  if (journey) {
    try {
      await setDoc(doc(db, "journeys", journey.id), journey);
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  }
};

export default createJourney;
