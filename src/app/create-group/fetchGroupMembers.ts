import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/app";
import { GroupMember, FetchGroupMemberParams } from "./types";
import { currentUserID } from "../globals";

const fetchGroupMembers = async ({
  groupMembers,
  setGroupMembers,
  setGroupMembersLoaded,
  groupID,
}: FetchGroupMemberParams): Promise<void> => {
  if (currentUserID) {
    try {
      const q = query(
        collection(db, "group-memberships"),
        where("groupID", "==", groupID)
      );
      const querySnapshot = await getDocs(q);

      if (groupMembers !== undefined && groupMembers.length > 0) {
        setGroupMembers([]);
      }

      querySnapshot.forEach((doc) => {
        const { membershipID, userID, displayName } = doc.data();

        const groupMember: GroupMember = {
          membershipID,
          userID,
          displayName,
        };

        setGroupMembers((prevGroupMembers) => [
          ...prevGroupMembers,
          groupMember,
        ]);
      });
      if (!querySnapshot.empty) {
        setGroupMembersLoaded(true);
      }
    } catch (err) {
      console.log("error:", err);
    }
  } else {
    console.log("Error :", "User isn't authenticated");
  }
};

export default fetchGroupMembers;
