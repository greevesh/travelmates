import { setDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/app";
import { AppUser } from "../types";

const createUser = async (user: AppUser | null): Promise<void> => {
  if (user) {
    await setDoc(doc(db, "users", user.id), user);
  }
};

export default createUser;
