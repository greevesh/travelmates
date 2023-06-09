'use client'
import { initializeApp } from "firebase/app";
import firebaseConfig from "@root/firebase/config";

initializeApp(firebaseConfig)

export default function Groups() {

    return (
        <div>
        <h1>Groups</h1>
        </div>
    )
}