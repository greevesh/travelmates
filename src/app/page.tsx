'use client';
import { initializeApp } from "firebase/app";
import firebaseConfig from "@root/firebase/config";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useRouter } from "next/navigation";

export default function Home() {
  initializeApp(firebaseConfig);
  const auth = getAuth();
  const router = useRouter();
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        onAuthStateChanged(auth, (user) => {
          if (user) {
        console.log('signed in', user)
        router.push('/groups');
          } else {
            console.log('signed out')
            router.push('/');
          }
        });
      } catch (error) {
        console.error(error);
      }
    };

    handleRedirectResult();
  }, [signInWithGoogle]);

  return (
    <div>
      <div>
      <button onClick={() => signInWithGoogle()}>Sign in with Google</button>
    </div>
    </div>
  )
}
