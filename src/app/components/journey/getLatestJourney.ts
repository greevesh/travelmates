import {
  query,
  collection,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "@root/firebase/app";
import { Journey, JourneysStateParams } from "../../types";
import formatDate from "./formatDate";
import { currentUserID } from "../../globals";

const getLatestJourney = async ({
  setJourneys,
  setJourneysLoaded,
}: JourneysStateParams): Promise<void> => {
  try {
    if (currentUserID) {
      const q = query(
        collection(db, "journeys"),
        where("userID", "==", currentUserID),
        orderBy("created", "desc"),
        limit(1)
      );

      const currentUserJourneys = await getDocs(q);

      if (!currentUserJourneys.empty) {
        const lastJourney = currentUserJourneys.docs[0].data();
        const { id, location, dateRange } = lastJourney;
        const startDate: Date = formatDate(dateRange.startDate);
        const endDate: Date = formatDate(dateRange.endDate);

        const journey: Journey = {
          id,
          location,
          dateRange: { startDate, endDate },
        };

        setJourneys((journeys) => [...journeys, journey]);
        setJourneysLoaded(true);

        console.log("Last Journey Data:", lastJourney);
      } else {
        console.log("No journeys found in the collection.");
      }
    } else {
      console.log("User isn't authenticated");
    }
  } catch (error) {
    console.error("Error getting last journey:", error);
  }
};

export default getLatestJourney;
