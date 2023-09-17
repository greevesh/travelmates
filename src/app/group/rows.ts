import { Row } from "../../../src/app/types";
import {
  getDocs,
  query,
  collection,
  where,
  type QuerySnapshot,
  type Query,
} from "firebase/firestore";
import { db } from "../../../firebase/app";
import { currentUserID } from "../globals";

async function fetchUserDisplayName() {
  const q: Query<Document> = query(
    collection(db, "users"),
    where("id", "==", currentUserID)
  );
  const querySnapshot: QuerySnapshot<unknown> = await getDocs(q);

  if (querySnapshot.size === 1) {
    const user = querySnapshot.docs[0].data();
    return user.displayName;
  } else {
    return "N/A";
  }
}

async function fetchRows() {
  const currentUserDisplayName: string = await fetchUserDisplayName();

  const rows: Row[] = [
    {
      id: 1,
      name: currentUserDisplayName,
      month: "August",
      year: 2023,
      places: ["Moalboal (PH)", "Moalboal (PH)"],
    },
    {
      id: 2,
      name: "Myo",
      month: "September",
      year: 2023,
      places: ["Taipei (TW)", "Taipei (TW)"],
    },
  ];

  return rows;
}

export default fetchRows;
