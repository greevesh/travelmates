import {
  query,
  collection,
  where,
  getDocs,
  type Query,
  type QuerySnapshot,
  type DocumentData,
} from "firebase/firestore";
import { db } from "../../../firebase/app";
import { currentUserID } from "../globals";

export let displayName: string = "";

const getCurrentUserDisplayName = async (): Promise<string> => {
  try {
    const q: Query<DocumentData> = query(
      collection(db, "users"),
      where("id", "==", currentUserID)
    );
    const querySnapshot: QuerySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      displayName = doc.data().displayName;
    });
  } catch (err) {
    console.log("Error retrieving current user's display name:", err);
    displayName = "N/A";
  }

  console.log(displayName);
  return displayName;
};

export default getCurrentUserDisplayName;
