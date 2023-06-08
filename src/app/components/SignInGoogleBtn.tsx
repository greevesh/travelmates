'use client';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, type User, type Auth } from "firebase/auth";
import { useEffect } from "react";
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useRouter } from "next/navigation";

import firebaseConfig from "@root/firebase/config";
import { AuthError } from "../lib/exceptions";

initializeApp(firebaseConfig);

const SignInWithGoogle = () => {
  const auth: Auth = getAuth();
  const router = useRouter();
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        onAuthStateChanged(auth, (user: User | null) => {
          if (user) {
        console.log('signed in', user)
        router.push('/groups');
          } 
        });
      } catch (error) {
        throw new AuthError('There was an error signing in.');
      }
    };

    handleRedirectResult();
  }, [signInWithGoogle]);

  return (
    <div>
      <button onClick={() => signInWithGoogle()}>Sign in with Google</button>
    </div>
  )
}

export default SignInWithGoogle