'use client';
import { initializeApp } from "@firebase/app";
import firebaseConfig from "@root/firebase/config";
import { useEffect } from "react";
import { getAuth, signInWithRedirect, GoogleAuthProvider, getRedirectResult } from "firebase/auth";

export default function Home() {
  const provider = new GoogleAuthProvider();
  initializeApp(firebaseConfig);
  const auth = getAuth();
  const signInWithGoogle = () => {
    signInWithRedirect(auth, provider);
  }

  useEffect(() => {
    // Handle the redirect result after sign-in
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        // Handle the sign-in result here
        console.log(result);
      } catch (error) {
        // Handle any errors that occurred during sign-in
        console.error(error);
      }
    };

    handleRedirectResult();
  }, []);

  return (
    <div>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  )
}
