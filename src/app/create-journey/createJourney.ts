import { Journey } from "../create-journey/types";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/app";

const createJourney = async (journey: Journey | null): Promise<void> => {
  if (journey?.id) {
    try {
      await setDoc(doc(db, "journeys", journey.id), journey);
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  }
};

export default createJourney;
