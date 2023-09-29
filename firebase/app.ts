import { getFirestore, Firestore } from "firebase/firestore";
import firebaseConfig from "./config";
import { getApps } from "../node_modules/firebase/app";
import { initializeApp, type FirebaseApp } from "../node_modules/firebase/app";

export const firebaseApp: FirebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db: Firestore = getFirestore(firebaseApp);
