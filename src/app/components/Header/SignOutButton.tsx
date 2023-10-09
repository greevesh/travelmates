import React from "react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import Button from "@mui/material/Button";
import { signOut as logOut } from "firebase/auth";
import { auth } from "../../../../firebase/auth";
import "../../styles/globals.css";

const SignOutButton: React.FC = (): React.JSX.Element => {
  const router: AppRouterInstance = useRouter();

  const signOut = (): void => {
    try {
      logOut(auth).then(() => {
        router.push("/");
        localStorage.removeItem("currentUserID");
        localStorage.removeItem("groupID");
        console.log("Group ID: ", localStorage.getItem("groupID"));
        console.log("Current User ID: ", localStorage.getItem("currentUserID"));
        console.log("signed out", auth.currentUser);
      });
    } catch (error) {
      console.log("There was an error signing out.");
    }
  };

  return (
    <Button
      sx={{ backgroundColor: "white", color: "#1976d2", fontWeight: 500 }}
      variant="contained"
      onClick={() => signOut()}
    >
      Sign out
    </Button>
  );
};

export default SignOutButton;
