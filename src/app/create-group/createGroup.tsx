import { setDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/app";
import { Group } from "./types";

const createGroup = async (group: Group): Promise<void> => {
  if (group.id) {
    try {
      await setDoc(doc(db, "groups", group.id), group);
      console.log("group document written successfully!", group);
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  } else {
    console.log("group is null");
  }
};

export default createGroup;
