import { SetStateAction, Dispatch } from "react";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/app";
import { auth } from "../../../firebase/auth";

const getGroupID = async (
  setGroupID: Dispatch<SetStateAction<string | null>>
): Promise<void> => {
  if (auth.currentUser?.uid) {
    const currentUserId: string = auth.currentUser?.uid;
    try {
      const q = query(
        collection(db, "groups"),
        where("creatorID", "==", currentUserId)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docs = querySnapshot.docs.map((doc) => doc.data());
        const groupId = docs[0].id;
        localStorage.setItem("groupId", groupId);
        setGroupID(groupId);
      } else {
        console.log("Error: ", "No group documents found");
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log("Error: ", "currentUserId is undefined");
  }
};

export default getGroupID;
