import {
  query,
  collection,
  where,
  getDocs,
  type Query,
  type QuerySnapshot,
  type DocumentData,
} from "firebase/firestore";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { db } from "../../../../firebase/app";

export let displayName: string = "";

const fetchCurrentUserDisplayName = async (): Promise<string> => {
  try {
    const currentUserID: string | null = localStorage.getItem("currentUserID");
    const q: Query<DocumentData> = query(
      collection(db, "users"),
      where("id", "==", currentUserID)
    );
    const querySnapshot: QuerySnapshot = await getDocs(q);

    const userDoc: QueryDocumentSnapshot<DocumentData> = querySnapshot.docs[0];
    displayName = userDoc?.data().displayName;
  } catch (err) {
    console.log("Error retrieving current user's display name:", err);
  }

  return displayName;
};

export default fetchCurrentUserDisplayName;
