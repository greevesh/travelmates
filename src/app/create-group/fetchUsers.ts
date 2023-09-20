import { query, collection, getDocs, DocumentData } from "firebase/firestore";
import { db } from "../../../firebase/app";
import { currentUserID } from "../globals";
import { GroupMember } from "./types";

const fetchUsers = async (
  input: string,
  groupMembers: GroupMember[],
  setUsers: (users: any[]) => void
): Promise<void> => {
  const q = query(collection(db, "users"));
  const querySnapshot = await getDocs(q);

  try {
    const users: any = querySnapshot.docs
      .map((doc) => {
        const id: string = doc.data().id;
        const displayName: string = doc.data().displayName.toLowerCase();
        const inputLowerCase: string = input.toLowerCase();

        const alreadySelected = (id: string): boolean => {
          return groupMembers.some(
            (groupMember: GroupMember) => groupMember.userID === id
          );
        };

        if (
          displayName.startsWith(inputLowerCase.slice(0, input.length)) &&
          !alreadySelected(id) &&
          currentUserID !== id
        ) {
          return {
            id: id,
            photoURL: doc.data().photoURL,
            displayName: doc.data().displayName,
          };
        }

        return null;
      })
      .filter(Boolean);

    setUsers(users);
  } catch (err) {
    console.error("Error fetching users:", err);
  }
};

export default fetchUsers;
