"use client";
import { UserData } from "@root/src/app/types";
import { initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { redirect } from "@root/src/app/helpers";
import firebaseConfig from "@root/firebase/config";
import { AuthError } from "../lib/exceptions";

import { setDoc, doc, getFirestore } from "firebase/firestore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const firebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth();
const db = getFirestore(firebaseApp);

const createUser = async (userData: UserData | null): Promise<void> => {
  if (userData) {
    await setDoc(doc(db, "users", userData.id), userData);
  }
};

const SignInGoogleBtn = (): JSX.Element => {
  const user = auth.currentUser;
  let userData: UserData | null = null;
  const router = useRouter();

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
    const addUserToDB = async (): Promise<void> => {
      try {
        if (userData) {
          await createUser(userData);
          router.push("/groups");
          console.log("sign in successful", userData);
        }
      } catch (error: any) {
        console.log("sign in error", error);
        throw new AuthError(error.message);
      }
    };

    addUserToDB();
  }, [signInWithGoogle, userData]);

  return (
    <div>
      <button onClick={() => signInWithGoogle()}>Sign in with Google</button>
    </div>
  );
};

export default SignInGoogleBtn;
