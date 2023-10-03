import {
  collection,
  getDocs,
  query,
  where,
  type Query,
  type QuerySnapshot,
  type DocumentData,
} from "firebase/firestore";
import { db } from "../../../firebase/app";
import { auth } from "../../../firebase/auth";

const getCurrentUserID = async (): Promise<string | void> => {
  // if user signs in with Google
  if (auth.currentUser?.uid) {
    try {
      const q: Query<DocumentData> = query(
        collection(db, "users"),
        where("id", "==", auth.currentUser.uid)
      );
      const querySnapshot: QuerySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const currentUserID: string = querySnapshot.docs[0].id;
        localStorage.setItem("currentUserID", currentUserID);

        return currentUserID;
      } else {
        console.log("Error: ", "No relevant docs were found");
      }
    } catch (err) {
      console.log("Error retrieving current user's id:", err);
    }
  }
};

export default getCurrentUserID;
