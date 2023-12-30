import {
  query,
  collection,
  where,
  getDocs,
  type Query,
  type QuerySnapshot,
  type DocumentData,
} from "firebase/firestore";
import { db } from "../../../../firebase/app";

const fetchGroupMemberships = async (): Promise<DocumentData[]> => {
  try {
    const groupId: string | null = localStorage.getItem("groupId");

    const q: Query<DocumentData> = query(
      collection(db, "group-memberships"),
      where("groupID", "==", groupId)
    );
    const querySnapshot: QuerySnapshot = await getDocs(q);

    const groupMemberships = querySnapshot.docs.map((doc) => doc.data());
    return groupMemberships;
  } catch (err) {
    console.log("Error retrieving group memberships:", err);
  }

  return [];
};

export default fetchGroupMemberships;
