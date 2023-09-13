import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "@root/firebase/app";
import { Journey, JourneysStateParams } from "../types";
import formatDate from "./formatDate";
import { currentUserID } from "../globals";

const fetchJourneys = async ({
  setJourneys,
  setJourneysLoaded,
}: JourneysStateParams): Promise<void> => {
  if (currentUserID) {
    const q = query(
      collection(db, "journeys"),
      where("userID", "==", currentUserID)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const { id, location, dateRange } = doc.data();
      const startDate: Date = formatDate(dateRange.startDate);
      const endDate: Date = formatDate(dateRange.endDate);

      const journey: Journey = {
        id,
        location,
        dateRange: { startDate, endDate },
      };

      setJourneys((prevJourneyData) => [...prevJourneyData, journey]);
      setJourneysLoaded(true);
    });
  } else {
    console.log("Error :", "User isn't authenticated");
  }
};

export default fetchJourneys;
