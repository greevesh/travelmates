import { getAuth, type Auth } from "../node_modules/firebase/auth";
import { firebaseApp } from "./app";
export const auth: Auth = getAuth(firebaseApp);
