import { query, collection, getDocs, DocumentData } from "firebase/firestore";
import { db } from "../../../firebase/app";
import { currentUserID } from "../globals";
import { SelectedUser, GroupMember, FetchUsersProps } from "./types";

const fetchUsers = async ({
  userInput,
  selectedUsers,
  groupMembers,
  setUsers,
}: FetchUsersProps): Promise<void> => {
  const q = query(collection(db, "users"));
  const querySnapshot = await getDocs(q);

  try {
    const users: any = querySnapshot.docs
      .map((doc) => {
        const id: string = doc.data().id;
        const displayName: string = doc.data().displayName.toLowerCase();
        const inputLowerCase: string = userInput.toLowerCase();

        const alreadySelected = (id: string): boolean => {
          return selectedUsers.some(
            (selectedUser: SelectedUser) => selectedUser.id === id
          );
        };

        const alreadyMember = (id: string): boolean => {
          return groupMembers.some(
            (groupMember: GroupMember) => groupMember.userID === id
          );
        };

        if (
          displayName.startsWith(inputLowerCase.slice(0, userInput.length)) &&
          !alreadySelected(id) &&
          !alreadyMember(id) &&
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
