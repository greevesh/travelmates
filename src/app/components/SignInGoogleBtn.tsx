"use client";
import { UserData } from "@root/src/app/types";
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth, Auth, User } from "firebase/auth";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import firebaseConfig from "@root/firebase/config";
import { AuthError } from "../lib/exceptions";

import { setDoc, doc, getFirestore, Firestore } from "firebase/firestore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

import styles from "../styles/auth/google-sign-in-btn.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth();
const db: Firestore = getFirestore(firebaseApp);

const createUser = async (userData: UserData | null): Promise<void> => {
  if (userData) {
    await setDoc(doc(db, "users", userData.id), userData);
  }
};

const SignInGoogleBtn = (): JSX.Element => {
  const user: User | null = auth.currentUser;
  let userData: UserData | null = null;
  const router: AppRouterInstance = useRouter();

  // if user is signed in
  if (user) {
    userData = {
      id: user.uid,
      displayName: user.displayName!,
      email: user.email,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
    };
  }

  const [signInWithGoogle] = useSignInWithGoogle(auth);

  useEffect(() => {
    const handleSignIn = async (): Promise<void> => {
      try {
        if (userData) {
          router.push("/groups");
          await createUser(userData);
          console.log("sign in successful", userData);
        }
      } catch (error: any) {
        console.log("sign in error", error);
        throw new AuthError(error.message);
      }
    };

    handleSignIn();
  }, [userData]);

  return (
    <div>
      <button className={styles.btn} onClick={() => signInWithGoogle()}>
        <FontAwesomeIcon className={styles.icon} icon={faGoogle} />
        Sign in with Google
      </button>
    </div>
  );
};

export default SignInGoogleBtn;
