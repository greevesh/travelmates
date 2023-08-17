import { getFirestore, Firestore, setDoc, doc } from "firebase/firestore";
import firebaseConfig from "firebase/config";
import { initializeApp, FirebaseApp } from "node_modules/firebase/app";

export const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
export const db: Firestore = getFirestore(firebaseApp);

// export const createJourney = async (journey: JourneyData | null): Promise<void> => {
//   // ...
// };
