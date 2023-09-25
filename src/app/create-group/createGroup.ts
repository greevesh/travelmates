import { setDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/app";
import { Group } from "./types";

const createGroup = async (group: Group): Promise<void> => {
  if (group.id) {
    try {
      await setDoc(doc(db, "groups", group.id), group);
      console.log("Group document written successfully!", group);
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  } else {
    console.log("Group is null");
  }
};

export default createGroup;
