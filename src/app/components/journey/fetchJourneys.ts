import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "@root/firebase/app";
import { Journey } from "../../types";

interface FetchJourneysParams {
  setJourneys: React.Dispatch<React.SetStateAction<Journey[]>>;
  setJourneysLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const fetchJourneys = async ({
  setJourneys,
  setJourneysLoaded,
}: FetchJourneysParams): Promise<void> => {
  const currentUserID = localStorage.getItem("userID");

  if (currentUserID) {
    const q = query(
      collection(db, "journeys"),
      where("userID", "==", currentUserID)
    );

    const querySnapshot = await getDocs(q);

    const formatDate = (timestamp: number): Date => {
      let formattedDate: Date = new Date(timestamp * 1000);
      return formattedDate;
    };

    querySnapshot.forEach((doc) => {
      const { id, location, dateRange } = doc.data();
      const startDate: Date = formatDate(dateRange.startDate);
      const endDate: Date = formatDate(dateRange.endDate);

      const newJourneyData: Journey = {
        id,
        location,
        dateRange: { startDate, endDate },
      };

      setJourneys((prevJourneyData) => [...prevJourneyData, newJourneyData]);
      setJourneysLoaded(true);
    });
  } else {
    console.log("Error :", "User isn't authenticated");
  }
};

export default fetchJourneys;
