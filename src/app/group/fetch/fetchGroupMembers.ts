import {
  query,
  collection,
  getDocs,
  type Query,
  type QuerySnapshot,
  type DocumentData,
} from "firebase/firestore";
import { db } from "../../../../firebase/app";
import fetchGroupMemberships from "./fetchGroupMemberships";

const fetchGroupMembers = async (): Promise<DocumentData[]> => {
  try {
    const currentUserId: string | null = localStorage.getItem("currentUserID");
    const groupMemberships: DocumentData[] = await fetchGroupMemberships();

    const groupMemberIds = groupMemberships.map(
      (membership: DocumentData) => membership.userID
    );

    const q: Query<DocumentData> = query(collection(db, "users"));
    const querySnapshot: QuerySnapshot = await getDocs(q);

    const groupMembers: DocumentData[] = querySnapshot.docs
      .filter((user) => groupMemberIds.includes(user.data().id))
      .map((user) => user.data());

    // Make sure the current user is positioned at the first index
    groupMembers.sort((a, b) => {
      if (a.id === currentUserId) return -1;
      if (b.id === currentUserId) return 1;
      return 0;
    });

    return groupMembers;
  } catch (err) {
    console.log("Error retrieving group members:", err);
  }

  return [];
};

export default fetchGroupMembers;
