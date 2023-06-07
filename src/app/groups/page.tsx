'use client'
import { initializeApp } from "firebase/app";
import firebaseConfig from "@root/firebase/config";
import { signOut as logOut, getAuth } from "firebase/auth"

export default function Groups() {
    initializeApp(firebaseConfig)
    const auth = getAuth()

    const signOut = () => {
        logOut(auth).then(() => {
          console.log('signed out')
        }).catch((error) => {
          console.log(error)
        });
      }

    return (
        <div>
        <h1>Groups</h1>
        <div>
    <button onClick={signOut}>Sign out</button>
  </div>
        </div>
    )
}