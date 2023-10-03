import { SetStateAction, Dispatch } from "react";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/app";
import { auth } from "../../../firebase/auth";

const getGroupID = async (
  setGroupID: Dispatch<SetStateAction<string | null>>
): Promise<void> => {
  if (auth.currentUser?.uid) {
    const currentUserID: string = auth.currentUser?.uid;
    try {
      const q = query(
        collection(db, "groups"),
        where("creatorID", "==", currentUserID)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const groupID: string = querySnapshot.docs[0].data().id;
        localStorage.setItem("groupID", groupID);
        setGroupID(groupID);
        console.log("Group ID found: ", localStorage.getItem("groupID"));
      } else {
        console.log("Error: ", "No group documents found");
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log("Error: ", "Couldn't find currentUserID");
  }
};

export default getGroupID;
