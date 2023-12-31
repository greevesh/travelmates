"use client";
import React, { useState } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { type AppRouterInstance } from "next/dist/shared/lib/app-router-context";

import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import { type User } from "firebase/auth";
import { auth } from "../../../../firebase/auth";
import { AppUser } from "../../types";
import getGroupID from "../../auth/getGroupID";
import getCurrentUserID from "../../auth/getCurrentUserID";

const SignInGoogleButton: React.FC = (): React.JSX.Element => {
  const [groupID, setGroupID] = useState<string | null>(null);
  const [retrievedGroupID, setRetrievedGroupID] = useState<boolean>(false);
  let user: User | null = auth.currentUser;
  let appUser: AppUser | null = null;
  const router: AppRouterInstance = useRouter();
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  if (user) {
    appUser = {
      id: user.uid,
      displayName: user.displayName!,
      email: user.email,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
    };
  }

  useEffect(() => {
    const handleSignIn = async (): Promise<void> => {
      try {
        await getGroupID(setGroupID);
        setRetrievedGroupID(true);
        await getCurrentUserID();
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    handleSignIn();
  }, [user]);

  useEffect(() => {
    if (retrievedGroupID && groupID) {
      router.push(`/group/${groupID}`);
    }
  }, [groupID, retrievedGroupID]);

  return (
    <div>
      <Button variant="contained" onClick={() => signInWithGoogle()}>
        <GoogleIcon sx={{ marginRight: 1 }} />
        Continue with Google
      </Button>
    </div>
  );
};

export default SignInGoogleButton;
