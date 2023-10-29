import {
  query,
  collection,
  getDocs,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "../../../firebase/app";
import { Journey } from "../create-journey/types";

export const fetchJourneys = async (): Promise<Journey[]> => {
  const journeysCollection = collection(db, "journeys");
  const journeysSnapshot: QuerySnapshot<DocumentData> = await getDocs(
    query(journeysCollection)
  );

  const journeyPromises: Promise<Journey>[] = journeysSnapshot.docs.map(
    async (doc: QueryDocumentSnapshot<Journey>) => doc.data() as Journey
  );

  const journeys: Journey[] = await Promise.all(journeyPromises);

  return journeys;
};
